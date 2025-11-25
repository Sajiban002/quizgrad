import React, { useState } from 'react';
import { Loader, CheckCircle, XCircle, Brain, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { useQuiz } from '../hooks/useQuiz';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const CreatePage = ({ setCurrentPage }) => {
  const [step, setStep] = useState('input');
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState(null);

  const { currentQuiz, generateQuiz, checkQuiz } = useQuiz();

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) return;
    
    setStep('generating');
    try {
      const quiz = await generateQuiz(topic, numQuestions);
      setUserAnswers(new Array(quiz.questions.length).fill(null));
      setStep('quiz');
    } catch (error) {
      alert('Ошибка генерации: ' + error.message);
      setStep('input');
    }
  };

  const selectAnswer = (answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleCheckQuiz = async () => {
    try {
      const result = await checkQuiz(
        currentQuiz.id,
        currentQuiz.topic,
        currentQuiz.category,
        currentQuiz.questions,
        userAnswers
      );
      setResults(result);
      setStep('results');
    } catch (error) {
      alert('Ошибка проверки: ' + error.message);
    }
  };

  const resetQuiz = () => {
    setStep('input');
    setTopic('');
    setNumQuestions(5);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setResults(null);
  };

  if (step === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 border border-orange-200 rounded-full px-6 py-2 mb-6">
              <Brain className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">ИИ генерация</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Создайте свою викторину
            </h1>
            <p className="text-xl text-gray-600">
              Искусственный интеллект создаст идеальные вопросы за секунды
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  О чём будет викторина? 🎯
                </label>
                <Input
                  type="text"
                  placeholder="Например: История Средневековья, Квантовая физика, JavaScript..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="text-lg py-4"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Чем конкретнее тема, тем лучше будут вопросы
                </p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Сколько вопросов? 📝
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[5, 10, 20].map(num => (
                    <button
                      key={num}
                      onClick={() => setNumQuestions(num)}
                      className={`group relative py-6 rounded-2xl font-bold text-lg transition-all ${
                        numQuestions === num
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-xl scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                      }`}
                    >
                      <div className="text-3xl mb-1">{num}</div>
                      <div className="text-sm opacity-80">вопросов</div>
                      {numQuestions === num && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateQuiz}
                disabled={!topic.trim()}
                className="group w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
              >
                <span className="flex items-center justify-center space-x-3">
                  <Brain className="w-6 h-6" />
                  <span>Создать викторину с ИИ</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-gray-900">Мгновенно</div>
              <div className="text-sm text-gray-600">Генерация за секунды</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-gray-900">Точно</div>
              <div className="text-sm text-gray-600">Качественные вопросы</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div className="text-2xl mb-2">🌟</div>
              <div className="font-semibold text-gray-900">Умно</div>
              <div className="text-sm text-gray-600">Адаптивная сложность</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div 
            className="rounded-3xl shadow-2xl p-16 text-white relative overflow-hidden"
            style={{ 
              backgroundColor: currentQuiz?.style?.color || '#f59e0b',
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)'
            }}
          >
            <div className="relative z-10">
              <Loader className="w-20 h-20 animate-spin mx-auto mb-8" />
              <h2 className="text-4xl font-bold mb-4">Генерируем викторину...</h2>
              <p className="text-xl opacity-90 mb-8">ИИ создаёт вопросы по теме: <span className="font-bold">{topic}</span></p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'quiz' && currentQuiz) {
    const question = currentQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;
    const answeredCount = userAnswers.filter(a => a !== null).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                  style={{ backgroundColor: currentQuiz.style.color + '20' }}
                >
                  {currentQuiz.style.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase">{currentQuiz.category}</div>
                  <div className="font-bold text-gray-900">Вопрос {currentQuestion + 1} из {currentQuiz.questions.length}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{Math.round(progress)}%</div>
                <div className="text-sm text-gray-500">{answeredCount} / {currentQuiz.questions.length} ответов</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-3 rounded-full transition-all duration-500 shadow-inner"
                style={{ 
                  width: `${progress}%`, 
                  backgroundColor: currentQuiz.style.color,
                  boxShadow: `0 0 10px ${currentQuiz.style.color}50`
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-6 border-2 border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option, idx) => {
                const isSelected = userAnswers[currentQuestion] === idx;
                const letters = ['A', 'B', 'C', 'D'];
                
                return (
                  <button
                    key={idx}
                    onClick={() => selectAnswer(idx)}
                    className={`group w-full text-left p-6 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 hover:scale-102'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600'
                      }`}>
                        {letters[idx]}
                      </div>
                      <span className={`text-lg font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              variant="secondary"
              className="group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Назад</span>
            </Button>
            
            <div className="text-sm text-gray-500 font-medium">
              {userAnswers[currentQuestion] !== null ? '✓ Ответ выбран' : 'Выберите ответ'}
            </div>
            
            {currentQuestion < currentQuiz.questions.length - 1 ? (
              <Button 
                onClick={() => setCurrentQuestion(prev => prev + 1)} 
                variant="primary"
                className="group bg-gradient-to-r from-yellow-500 to-orange-500"
              >
                <span>Далее</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button
                onClick={handleCheckQuiz}
                disabled={userAnswers.includes(null)}
                variant="success"
                className="bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Проверить</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results' && results) {
    const percentage = results.score;
    const getResultMessage = () => {
      if (percentage >= 90) return { text: 'Превосходно!', emoji: '🎉', color: 'green' };
      if (percentage >= 70) return { text: 'Хорошо!', emoji: '👍', color: 'blue' };
      if (percentage >= 50) return { text: 'Неплохо!', emoji: '😊', color: 'yellow' };
      return { text: 'Попробуйте еще раз!', emoji: '💪', color: 'red' };
    };
    
    const resultMessage = getResultMessage();

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8 text-center border-2 border-gray-100">
            <div className="text-7xl mb-4">{resultMessage.emoji}</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">{resultMessage.text}</h2>
            <div className={`inline-block text-7xl font-bold mb-4 bg-gradient-to-r ${
              percentage >= 70 ? 'from-green-500 to-emerald-500' : 'from-red-500 to-orange-500'
            } bg-clip-text text-transparent`}>
              {percentage}%
            </div>
            <p className="text-xl text-gray-600 mb-6">
              Правильных ответов: <span className="font-bold">{results.correctAnswers}</span> из <span className="font-bold">{results.totalQuestions}</span>
            </p>
            
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="56" 
                    stroke={percentage >= 70 ? '#22c55e' : '#ef4444'}
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {results.results.map((result, idx) => (
              <div 
                key={idx} 
                className={`bg-white p-6 rounded-2xl border-2 transition-all ${
                  result.isCorrect 
                    ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' 
                    : 'border-red-200 bg-gradient-to-r from-red-50 to-orange-50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    result.isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {result.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <XCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 mb-3 text-lg">{result.question}</p>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-semibold text-gray-700">Ваш ответ:</span>{' '}
                        <span className={result.isCorrect ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                          {result.options[result.userAnswer]}
                        </span>
                      </p>
                      {!result.isCorrect && (
                        <p className="text-sm">
                          <span className="font-semibold text-gray-700">Правильный ответ:</span>{' '}
                          <span className="text-green-700 font-semibold">
                            {result.options[result.correctAnswer]}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={resetQuiz} 
              variant="primary"
              size="lg"
              fullWidth
              className="bg-gradient-to-r from-yellow-500 to-orange-500 group"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Создать новую викторину</span>
            </Button>
            <Button 
              onClick={() => setCurrentPage('home')} 
              variant="secondary"
              size="lg"
              fullWidth
            >
              <span>На главную</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CreatePage;