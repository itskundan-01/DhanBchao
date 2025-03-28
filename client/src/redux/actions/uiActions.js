import {
  SHOW_TOAST,
  CLEAR_TOAST,
  SET_LOADING,
  CLEAR_LOADING
} from './types';

export const showToast = (message, severity = 'info', duration = 3000) => ({
  type: SHOW_TOAST,
  payload: {
    message,
    severity, // 'success', 'error', 'warning', 'info'
    duration
  }
});

export const clearToast = () => ({
  type: CLEAR_TOAST
});

export const setLoading = (key, isLoading = true) => ({
  type: SET_LOADING,
  payload: {
    key,
    isLoading
  }
});

export const clearLoading = (key) => ({
  type: CLEAR_LOADING,
  payload: { key }
});
