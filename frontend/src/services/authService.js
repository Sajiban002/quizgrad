import { apiService } from './api';

class AuthService {
  async login(email, password) {
    try {
      const response = await apiService.post('/auth/login', { email, password });
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      return response.user;
    } catch (error) {
      throw new Error(error.message || 'Ошибка входа');
    }
  }

  async register(username, email, password) {
    try {
      const response = await apiService.post('/auth/register', { 
        username, 
        email, 
        password 
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Ошибка регистрации');
    }
  }

  async logout() {
    try {
      localStorage.removeItem('authToken');
      return true;
    } catch (error) {
      throw new Error(error.message || 'Ошибка выхода');
    }
  }

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return null;
      }
      
      const response = await apiService.get('/auth/me');
      return response.user;
    } catch (error) {
      localStorage.removeItem('authToken');
      return null;
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }
}

export const authService = new AuthService();