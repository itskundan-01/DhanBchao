import { SHOW_TOAST, CLEAR_TOAST, SET_LOADING, CLEAR_LOADING } from './types';

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast: 'success', 'error', 'warning', 'info'
 * @returns {Object} Redux action
 */
export const showToast = (message, type = 'info') => ({
  type: SHOW_TOAST,
  payload: { message, type }
});

/**
 * Clear the current toast
 * @returns {Object} Redux action
 */
export const clearToast = () => ({
  type: CLEAR_TOAST
});

/**
 * Set a loading state
 * @param {string} key - The key for the loading state
 * @returns {Object} Redux action
 */
export const setLoading = (key) => ({
  type: SET_LOADING,
  payload: key
});

/**
 * Clear a loading state
 * @param {string} key - The key for the loading state
 * @returns {Object} Redux action
 */
export const clearLoading = (key) => ({
  type: CLEAR_LOADING,
  payload: key
});
