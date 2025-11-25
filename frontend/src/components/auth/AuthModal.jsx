import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Modal from '../common/Modal';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login'); 

  const handleClose = () => {
    setActiveTab('login'); 
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab === 'login' ? 'Вход' : 'Регистрация'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-sm font-semibold transition ${
              activeTab === 'login'
                ? 'text-yellow-500 border-b-2 border-yellow-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Вход
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 text-sm font-semibold transition ${
              activeTab === 'register'
                ? 'text-yellow-500 border-b-2 border-yellow-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Регистрация
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'login' ? (
            <LoginForm onSuccess={handleClose} />
          ) : (
            <RegisterForm onSuccess={() => setActiveTab('login')} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;