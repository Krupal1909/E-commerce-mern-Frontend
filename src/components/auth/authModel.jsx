// AuthModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  // API Configuration
  const API_BASE_URL = 'http://localhost:5000/api/auth'; // Replace with your API URL

  // Login API call
  const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  };

  // Register API call
  const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        const response = await loginUser(formData.email, formData.password);
        
        // Store token in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        console.log('Login successful:', response);
        
        // Close modal and refresh page or redirect
        onClose();
        window.location.reload(); // or use navigate('/dashboard')
        
      } else {
        const response = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        
        console.log('Registration successful:', response);
        
        // Optionally auto-login after registration
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          onClose();
          window.location.reload();
        } else {
          // Switch to login mode if no auto-login
          setMode('login');
          setFormData({ name: '', email: '', password: '' });
          setError('Registration successful! Please login.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({ name: '', email: '', password: '' });
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          disabled={isLoading}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            <span className="text-green-500">User</span> {mode === 'login' ? 'Login' : 'Sign Up'}
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Type here"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Type here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Type here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={isLoading}
              minLength="6"
            />
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
            {mode === 'login' ? (
              <>
                Create an account?{' '}
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-green-500 hover:text-green-600 font-medium"
                  disabled={isLoading}
                >
                  click here
                </button>
              </>
            ) : (
              <>
                Already have account?{' '}
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-green-500 hover:text-green-600 font-medium"
                  disabled={isLoading}
                >
                  click here
                </button>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {mode === 'login' ? 'Logging in...' : 'Creating Account...'}
              </div>
            ) : (
              mode === 'login' ? 'Login' : 'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

// Optional: Auth utilities helper file (authUtils.js)
export const authUtils = {
  // Check if user is logged in
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  },

  // Set auth header for API calls
  getAuthHeaders: () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

// Example usage in other components:
// import { authUtils } from './authUtils';
// 
// const isLoggedIn = authUtils.isAuthenticated();
// const currentUser = authUtils.getCurrentUser();
// const token = authUtils.getToken();