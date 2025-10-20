/**
 * API Configuration
 * Handles different API URLs based on environment
 */

// Get the API URL from environment variables
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';

// API endpoints
export const API_ENDPOINTS = {
  USERS: '/api/user',
  USER_BY_ID: (id) => `/api/user/${id}`,
  HEALTH: '/api/health'
};

// You can also add other configuration based on environment
export const CONFIG = {
  isDevelopment: APP_ENV === 'development',
  isStaging: APP_ENV === 'staging',
  isProduction: APP_ENV === 'production',
  
  // Example: Enable/disable features based on environment
  enableDebugLogs: APP_ENV === 'development',
  apiTimeout: APP_ENV === 'production' ? 5000 : 10000,
};

console.log('Environment:', APP_ENV);
console.log('API Base URL:', API_BASE_URL);
