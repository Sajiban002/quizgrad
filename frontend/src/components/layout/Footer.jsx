import React from 'react';
import { Mail, Github, Twitter, Linkedin, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">
                <span>Quiz</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Grad</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Умная платформа для создания образовательных викторин с помощью искусственного интеллекта.
            </p>
            
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 rounded-lg flex items-center justify-center transition-all group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 rounded-lg flex items-center justify-center transition-all group"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 rounded-lg flex items-center justify-center transition-all group"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Навигация</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mr-0 group-hover:mr-2 transition-all"></span>
                  Как это работает
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mr-0 group-hover:mr-2 transition-all"></span>
                  Функции
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mr-0 group-hover:mr-2 transition-all"></span>
                  Тарифы
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mr-0 group-hover:mr-2 transition-all"></span>
                  О нас
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@quizgrad.com" className="text-gray-400 hover:text-white transition flex items-center group">
                  <Mail className="w-4 h-4 mr-2 group-hover:text-orange-400 transition" />
                  support@quizgrad.com
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mr-0 group-hover:mr-2 transition-all"></span>
                  Документация
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mr-0 group-hover:mr-2 transition-all"></span>
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mr-0 group-hover:mr-2 transition-all"></span>
                  Поддержка
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>© {currentYear} QuizGrad. Сделано с</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>в Казахстане</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-white transition">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;