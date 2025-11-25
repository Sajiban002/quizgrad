import React from 'react';
import { ArrowRight, Sparkles, Zap, TrendingUp, Award, Users, Rocket } from 'lucide-react';
import Footer from '../components/layout/Footer';
import { useQuiz } from '../hooks/useQuiz';
import { getThemeByCategory } from '../constants/themes';

const HomePage = ({ setCurrentPage }) => {
  const { quizzes, isLoading } = useQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 rounded-full px-6 py-2 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-700">Powered by AI</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Создавайте викторины
              <br />
              <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                с помощью ИИ
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Умная платформа для создания образовательных викторин на любую тему. 
              Быстро, легко и эффективно.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage('create')}
                className="group flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <span>Создать викторину</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-200">
                <span>Посмотреть примеры</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">1000+</div>
                <div className="text-sm text-gray-600">Викторин создано</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">Активных пользователей</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                <div className="text-sm text-gray-600">Точность ИИ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают QuizGrad?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мощные инструменты для создания идеальных викторин
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-blue-200">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">ИИ генерация</h3>
              <p className="text-gray-700 leading-relaxed">
                Автоматическое создание вопросов на основе любой темы с использованием передовых алгоритмов
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-purple-200">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Умная стилизация</h3>
              <p className="text-gray-700 leading-relaxed">
                Автоматический подбор дизайна и цветовой палитры под тематику викторины
              </p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-green-200">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Детальная статистика</h3>
              <p className="text-gray-700 leading-relaxed">
                Отслеживайте прогресс и анализируйте результаты с подробными графиками
              </p>
            </div>

            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-orange-200">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Достижения</h3>
              <p className="text-gray-700 leading-relaxed">
                Система наград и бейджей для мотивации и геймификации обучения
              </p>
            </div>

            <div className="group bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-pink-200">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Совместная работа</h3>
              <p className="text-gray-700 leading-relaxed">
                Делитесь викторинами с друзьями и соревнуйтесь за лучшие результаты
              </p>
            </div>

            <div className="group bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-indigo-200">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Быстрый старт</h3>
              <p className="text-gray-700 leading-relaxed">
                Создайте свою первую викторину за считанные минуты без регистрации
              </p>
            </div>
          </div>
        </div>
      </section>

      {quizzes.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Недавние викторины</h2>
                <p className="text-gray-600">Посмотрите что создали другие пользователи</p>
              </div>
              <button className="hidden md:flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-semibold transition">
                <span>Смотреть все</span>
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.slice(-6).reverse().map((quiz, idx) => {
                const theme = getThemeByCategory(quiz.category);
                return (
                  <div 
                    key={idx} 
                    className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                          style={{ backgroundColor: theme.color + '20' }}
                        >
                          {theme.icon}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            {quiz.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">
                        {quiz.totalQuestions} вопросов
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition line-clamp-2">
                      {quiz.topic}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-600 font-medium">
                        {quiz.correctAnswers}/{quiz.totalQuestions} правильных
                      </span>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        quiz.score >= 70 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {quiz.score}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Готовы начать создавать?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Присоединяйтесь к тысячам пользователей которые уже создают викторины с QuizGrad
          </p>
          <button
            onClick={() => setCurrentPage('create')}
            className="group bg-white text-orange-600 px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-120"
          >
            <span className="flex items-center space-x-3">
              <span>Создать первую викторину</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;