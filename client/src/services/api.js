import axios from 'axios';
import { store } from '../store'; // Import redux store
import { AUTH_ERROR } from '../redux/actions/types';
import { showToast } from '../redux/actions/uiActions';

// Create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle token expiration or auth errors
    if (error.response) {
      if (error.response.status === 401) {
        // Clear token from storage
        localStorage.removeItem('token');
        
        // Dispatch AUTH_ERROR action
        store.dispatch({ type: AUTH_ERROR, payload: error.response.data?.error || 'Your session has expired. Please log in again.' });
        
        // Show toast notification
        store.dispatch(showToast('Your session has expired. Please log in again.', 'warning'));
        
        // Redirect to login page if not already there
        if (!window.location.pathname.includes('/auth')) {
          // Short delay to allow toast to be visible
          setTimeout(() => {
            window.location.href = '/auth';
          }, 1500);
        }
      } else if (error.response.status === 403) {
        // Permission issues
        store.dispatch(showToast('You do not have permission to perform this action.', 'error'));
      } else if (error.response.data?.error) {
        // Other errors with specific messages from the backend
        store.dispatch(showToast(error.response.data.error, 'error'));
      }
    } else if (error.request) {
      // The request was made but no response was received
      store.dispatch(showToast('Network error. Please check your connection.', 'error'));
    } else {
      // Something happened in setting up the request
      store.dispatch(showToast('An unexpected error occurred.', 'error'));
    }
    
    return Promise.reject(error);
  }
);

export default api;
