import { create } from 'zustand';
import { authAPI } from './api';

interface User {
  sub: string;
  email: string;
  role: string;
  teacherId?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  
  // Actions
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUserFromToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  token: null,

  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.register(email, password, name);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user: { ...user, sub: user.sub || user._id } });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Registration failed' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user: { ...user, sub: user.sub || user._id } });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Login failed' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  loadUserFromToken: () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode JWT to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        set({
          token,
          user: {
            sub: payload.sub,
            email: payload.email,
            role: payload.role,
            teacherId: payload.teacherId,
          },
        });
      } catch {
        localStorage.removeItem('token');
      }
    }
  },
}));
