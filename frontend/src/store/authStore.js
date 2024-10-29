import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signUp: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error) {
      set({
        error: error.response.data.message || 'Error signing up',
        isLoading: false,
        error: true,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: true });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || 'Error verifying email',
        isLoading: false,
        error: true,
      });
      throw error;
    }
  },
}));