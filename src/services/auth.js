import { SESSION_KEY } from '../utils/constants';
import { databaseService } from './database';

export const authService = {
  // Login user
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = databaseService.getCollection('users');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const token = btoa(JSON.stringify({ 
            id: user.id, 
            email: user.email,
            name: user.name,
            timestamp: Date.now()
          }));
          localStorage.setItem(SESSION_KEY, token);
          resolve({ user, token });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  // Register new user
  signup: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = databaseService.getCollection('users');
        const existingUser = users.find(u => u.email === userData.email);
        
        if (existingUser) {
          reject(new Error('User already exists'));
        } else {
          const newUser = {
            id: databaseService.getNextId('users'),
            ...userData,
            createdAt: new Date().toISOString()
          };
          
          // Save user to database
          const updatedUsers = [...users, newUser];
          databaseService.saveCollection('users', updatedUsers);
          
          const token = btoa(JSON.stringify({ 
            id: newUser.id, 
            email: newUser.email,
            name: newUser.name,
            timestamp: Date.now()
          }));
          localStorage.setItem(SESSION_KEY, token);
          resolve({ user: newUser, token });
        }
      }, 1000);
    });
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token));
      return !!payload.email;
    } catch {
      return false;
    }
  },

  // Get current user
  getCurrentUser: () => {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return null;
    
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  }
};