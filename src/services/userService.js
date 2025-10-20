import axios from 'axios';
import { API_ENDPOINTS } from '../utils/config';

const apiClient = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const apiKey = localStorage.getItem('api_key') || 'your-super-secret-api-key-here-12345';
    config.headers['X-API-Key'] = apiKey;
    return config;
});

export const userService = {
    getAllUsers: async () => {
        const response = await apiClient.get(API_ENDPOINTS.USERS);
        return response.data;
    },

    getUserById: async (id) => {
        const response = await apiClient.get(API_ENDPOINTS.USER_BY_ID(id));
        return response.data;
    },

    createUser: async (userData) => {
        const response = await apiClient.post(API_ENDPOINTS.USERS, userData);
        return response.data;
    },

    updateUser: async (id, userData) => {
        const response = await apiClient.patch(API_ENDPOINTS.USER_BY_ID(id), userData);
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await apiClient.delete(API_ENDPOINTS.USER_BY_ID(id));
        return response.data;
    },

    deleteAllUsers: async () => {
        const response = await apiClient.delete(API_ENDPOINTS.USERS);
        return response.data;
    }
};