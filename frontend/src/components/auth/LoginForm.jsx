import React, { useState } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

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
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Ошибка входа. Проверьте данные.');
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
      <div className="text-right">
        <a href="#" className="text-sm text-yellow-500 hover:text-yellow-600 transition">
          Забыли пароль?
        </a>
      </div>
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader size={18} className="animate-spin" />
            <span>Вход...</span>
          </>
        ) : (
          'Войти'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;