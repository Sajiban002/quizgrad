import React, { createContext, useState, useEffect } from 'react';
import { quizService } from '../services/quizService';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setIsLoading(true);
    try {
      const data = await quizService.getQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateQuiz = async (topic, numQuestions) => {
    setIsLoading(true);
    try {
      const quiz = await quizService.generateQuiz(topic, numQuestions);
      setCurrentQuiz(quiz);
      return quiz;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const checkQuiz = async (quizId, answers) => {
    setIsLoading(true);
    try {
      const results = await quizService.checkQuiz(quizId, answers);
      await fetchQuizzes();
      return results;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetCurrentQuiz = () => {
    setCurrentQuiz(null);
  };

  const value = {
    quizzes,
    currentQuiz,
    isLoading,
    fetchQuizzes,
    generateQuiz,
    checkQuiz,
    resetCurrentQuiz,
    setCurrentQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};