import React, { useState, useEffect } from 'react';
import { Home, PlusCircle, LogIn, CheckCircle, XCircle, Loader } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold">
              <span className="text-gray-800">Quiz</span>
              <span className="text-yellow-500">Grad</span>
            </h1>
          </div>
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                currentPage === 'home' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('create')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                currentPage === 'create' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <PlusCircle size={20} />
              <span>Create</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg transition">
              <LogIn size={20} />
              <span>Login</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">QuizGrad</h3>
            <p className="text-gray-600 text-sm">
              Создавайте умные викторины с помощью искусственного интеллекта
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Навигация</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Как это работает</a></li>
              <li><a href="#" className="hover:text-gray-900">Функции</a></li>
              <li><a href="#" className="hover:text-gray-900">О нас</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Контакты</h4>
            <p className="text-gray-600 text-sm">support@quizgrad.com</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2025 QuizGrad. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

const HomePage = ({ setCurrentPage, quizzes }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Создавайте викторины<br />с помощью <span className="text-yellow-500">ИИ</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Умная платформа для создания образовательных викторин на любую тему
          </p>
          <button
            onClick={() => setCurrentPage('create')}
            className="bg-yellow-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-600 transition shadow-lg"
          >
            Создать викторину
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ИИ генерация</h3>
            <p className="text-gray-600">Автоматическое создание вопросов на основе темы</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Умная стилизация</h3>
            <p className="text-gray-600">Автоматический подбор дизайна под тему</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Результаты</h3>
            <p className="text-gray-600">Детальная статистика по всем викторинам</p>
          </div>
        </div>

        {quizzes.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Недавние викторины</h2>
            <div className="grid grid-cols-3 gap-6">
              {quizzes.slice(-6).reverse().map((quiz, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{quiz.category ? THEME_STYLES[quiz.category]?.icon : '📝'}</span>
                    <span className="text-sm text-gray-500">{quiz.totalQuestions} вопросов</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.topic}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{quiz.correctAnswers}/{quiz.totalQuestions}</span>
                    <span className={`text-sm font-semibold ${quiz.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                      {quiz.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const THEME_STYLES = {
  'математика': { color: '#3b82f6', icon: '🔢', pattern: 'numbers' },
  'логика': { color: '#fbbf24', icon: '🧩', pattern: 'puzzle' },
  'история': { color: '#8b5cf6', icon: '📜', pattern: 'ancient' },
  'география': { color: '#10b981', icon: '🌍', pattern: 'map' },
  'физика': { color: '#ef4444', icon: '⚡', pattern: 'science' },
  'химия': { color: '#ec4899', icon: '🧪', pattern: 'molecules' },
  'биология': { color: '#22c55e', icon: '🧬', pattern: 'nature' },
  'литература': { color: '#f97316', icon: '📚', pattern: 'books' },
  'английский': { color: '#06b6d4', icon: '🇬🇧', pattern: 'language' },
  'программирование': { color: '#6366f1', icon: '💻', pattern: 'code' },
};

const CreatePage = () => {
  const [step, setStep] = useState('input');
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState(null);

  const generateQuiz = async () => {
    setStep('generating');
    try {
      const response = await fetch(`${API_URL}/generate-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, numQuestions })
      });
      const data = await response.json();
      setQuiz(data);
      setUserAnswers(new Array(data.questions.length).fill(null));
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

  const checkQuiz = async () => {
    try {
      const response = await fetch(`${API_URL}/check-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: quiz.id,
          topic: quiz.topic,
          category: quiz.category,
          questions: quiz.questions,
          answers: userAnswers
        })
      });
      const data = await response.json();
      setResults(data);
      setStep('results');
    } catch (error) {
      alert('Ошибка проверки: ' + error.message);
    }
  };

  const resetQuiz = () => {
    setStep('input');
    setTopic('');
    setNumQuestions(5);
    setQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setResults(null);
  };

  if (step === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Создать новую викторину</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Тема викторины
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Например: Математика 5 класс, История России, Физика..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Количество вопросов
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[5, 10, 20].map(num => (
                    <button
                      key={num}
                      onClick={() => setNumQuestions(num)}
                      className={`py-3 rounded-xl font-semibold transition ${
                        numQuestions === num
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num} вопросов
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateQuiz}
                disabled={!topic}
                className="w-full bg-yellow-500 text-white py-4 rounded-xl text-lg font-semibold hover:bg-yellow-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Создать викторину
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div 
            className="rounded-2xl shadow-lg p-12 text-center text-white"
            style={{ backgroundColor: quiz?.style?.color || '#6b7280' }}
          >
            <Loader className="w-16 h-16 animate-spin mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Генерируем викторину...</h2>
            <p className="text-xl opacity-90">ИИ создает вопросы по теме: {topic}</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'quiz' && quiz) {
    const question = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Вопрос {currentQuestion + 1} из {quiz.questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: quiz.style.color }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-10 mb-6">
            <div className="flex items-start space-x-4 mb-8">
              <span className="text-4xl">{quiz.style.icon}</span>
              <div className="flex-1">
                <span className="text-sm font-semibold text-gray-500 uppercase">{quiz.category}</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">{question.question}</h2>
              </div>
            </div>

            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition ${
                    userAnswers[currentQuestion] === idx
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      userAnswers[currentQuestion] === idx
                        ? 'border-yellow-500 bg-yellow-500'
                        : 'border-gray-300'
                    }`}>
                      {userAnswers[currentQuestion] === idx && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Назад
            </button>
            
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition"
              >
                Далее
              </button>
            ) : (
              <button
                onClick={checkQuiz}
                disabled={userAnswers.includes(null)}
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Проверить
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results' && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-10 mb-6">
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold mb-4 ${results.score >= 70 ? 'text-green-500' : 'text-red-500'}`}>
                {results.score}%
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {results.score >= 90 ? 'Отлично!' : results.score >= 70 ? 'Хорошо!' : 'Попробуйте еще раз'}
              </h2>
              <p className="text-gray-600">
                Правильных ответов: {results.correctAnswers} из {results.totalQuestions}
              </p>
            </div>

            <div className="space-y-4">
              {results.results.map((result, idx) => (
                <div key={idx} className={`p-4 rounded-xl border-2 ${
                  result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    {result.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-2">{result.question}</p>
                      <p className="text-sm text-gray-600">
                        Ваш ответ: <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {result.options[result.userAnswer]}
                        </span>
                      </p>
                      {!result.isCorrect && (
                        <p className="text-sm text-gray-600 mt-1">
                          Правильный ответ: <span className="text-green-600">
                            {result.options[result.correctAnswer]}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={resetQuiz}
              className="w-full mt-8 bg-yellow-500 text-white py-4 rounded-xl text-lg font-semibold hover:bg-yellow-600 transition"
            >
              Создать новую викторину
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(`${API_URL}/quizzes`);
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} quizzes={quizzes} />}
      {currentPage === 'create' && <CreatePage />}
    </div>
  );
}