import React, { useState } from 'react';
import { Mail, Lock, User, Loader, ArrowLeft, Sparkles, Shield, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const AuthPage = ({ setCurrentPage }) => {
  const [mode, setMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login, register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        setCurrentPage('home');
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Пароли не совпадают');
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Пароль должен содержать минимум 6 символов');
          setIsLoading(false);
          return;
        }
        await register(formData.username, formData.email, formData.password);
        setMode('login');
        setError('');
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (err) {
      setError(err.message || 'Произошла ошибка. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
        <div className="flex w-full max-w-6xl gap-12 items-center">
          <div className="hidden lg:flex flex-1 flex-col space-y-8">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition w-fit"
            >
              <ArrowLeft size={20} />
              <span>На главную</span>
            </button>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl font-bold">
                  <span className="text-gray-800">Quiz</span>
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Grad</span>
                </h1>
              </div>
              <p className="text-2xl text-gray-600 mb-8">
                Создавайте умные викторины с помощью искусственного интеллекта
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">ИИ генерация</h3>
                  <p className="text-gray-600">Автоматическое создание вопросов любой сложности</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Безопасность</h3>
                  <p className="text-gray-600">Ваши данные под надёжной защитой</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Мгновенно</h3>
                  <p className="text-gray-600">Создавайте викторины за секунды</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md w-full">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex lg:hidden items-center space-x-2 text-gray-600 hover:text-gray-900 transition mb-6"
            >
              <ArrowLeft size={20} />
              <span>Назад</span>
            </button>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {mode === 'login' ? 'С возвращением!' : 'Создать аккаунт'}
                </h2>
                <p className="text-gray-600">
                  {mode === 'login' 
                    ? 'Войдите чтобы продолжить' 
                    : 'Зарегистрируйтесь и начните создавать'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 animate-fadeIn">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'register' && (
                  <Input
                    type="text"
                    name="username"
                    label="Имя пользователя"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                    icon={<User size={18} />}
                    required
                  />
                )}

                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail size={18} />}
                  required
                />

                <Input
                  type="password"
                  name="password"
                  label="Пароль"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  icon={<Lock size={18} />}
                  required
                />

                {mode === 'register' && (
                  <Input
                    type="password"
                    name="confirmPassword"
                    label="Подтвердите пароль"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    icon={<Lock size={18} />}
                    required
                  />
                )}

                {mode === 'login' && (
                  <div className="text-right">
                    <a href="#" className="text-sm text-orange-600 hover:text-orange-700 font-medium transition">
                      Забыли пароль?
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      <span>{mode === 'login' ? 'Вход...' : 'Регистрация...'}</span>
                    </>
                  ) : (
                    <span>{mode === 'login' ? 'Войти' : 'Зарегистрироваться'}</span>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                  {' '}
                  <button
                    onClick={() => {
                      setMode(mode === 'login' ? 'register' : 'login');
                      setError('');
                      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                    }}
                    className="text-orange-600 hover:text-orange-700 font-semibold transition"
                  >
                    {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
                  </button>
                </p>
              </div>

              {mode === 'register' && (
                <p className="mt-6 text-xs text-gray-500 text-center">
                  Регистрируясь, вы соглашаетесь с{' '}
                  <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                    условиями использования
                  </a>
                  {' '}и{' '}
                  <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                    политикой конфиденциальности
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;