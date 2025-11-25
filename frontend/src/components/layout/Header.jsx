import React from 'react';
import { Home, PlusCircle, LogIn, User, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-gray-800">Quiz</span>
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Grad</span>
            </h1>
          </div>

          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                currentPage === 'home' 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Home size={20} />
              <span>Главная</span>
            </button>

            <button
              onClick={() => setCurrentPage('create')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                currentPage === 'create' 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <PlusCircle size={20} />
              <span>Создать</span>
            </button>

            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <LogOut size={20} />
                  <span>Выйти</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('auth')}
                className="flex items-center space-x-2 px-6 py-2.5 ml-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <LogIn size={20} />
                <span>Войти</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;