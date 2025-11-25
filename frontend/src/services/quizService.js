import { apiService } from './api';

class QuizService {
  async generateQuiz(topic, numQuestions) {
    try {
      const response = await apiService.post('/generate-quiz', { 
        topic, 
        numQuestions 
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Ошибка генерации викторины');
    }
  }

  async checkQuiz(quizId, topic, category, questions, answers) {
    try {
      const response = await apiService.post('/check-quiz', {
        id: quizId,
        topic,
        category,
        questions,
        answers
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Ошибка проверки викторины');
    }
  }

  async getQuizzes() {
    try {
      const response = await apiService.get('/quizzes');
      return response;
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
      return [];
    }
  }

  async getQuizById(quizId) {
    try {
      const response = await apiService.get(`/quizzes/${quizId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Ошибка загрузки викторины');
    }
  }

  async deleteQuiz(quizId) {
    try {
      await apiService.delete(`/quizzes/${quizId}`);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Ошибка удаления викторины');
    }
  }
}

export const quizService = new QuizService();