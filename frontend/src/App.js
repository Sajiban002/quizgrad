import React, { useState } from 'react';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <AuthProvider>
      <QuizProvider>
        <div className="min-h-screen bg-gray-50">
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          
          <main>
            {currentPage === 'home' && (
              <HomePage setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 'create' && (
              <CreatePage setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 'auth' && (
              <AuthPage setCurrentPage={setCurrentPage} />
            )}
          </main>
        </div>
      </QuizProvider>
    </AuthProvider>
  );
}