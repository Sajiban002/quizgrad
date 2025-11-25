import React, { useState } from 'react';
import { Mail, Lock, User, Loader } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Ошибка регистрации. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        type="text"
        name="username"
        label="Имя пользователя"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
        icon={<User size={18} />}
        required
      />

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

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader size={18} className="animate-spin" />
            <span>Регистрация...</span>
          </>
        ) : (
          'Зарегистрироваться'
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Регистрируясь, вы соглашаетесь с{' '}
        <a href="#" className="text-yellow-500 hover:text-yellow-600">
          условиями использования
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;