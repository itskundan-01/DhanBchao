import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from './types';
import * as authService from '../../services/authService';
import { showToast } from './uiActions';
import { clearUserState } from './userActions';

// Load user from token
export const loadUser = () => async dispatch => {
  try {
    // Check if token exists
    if (!authService.isAuthenticated()) {
      return dispatch({
        type: AUTH_ERROR
      });
    }

    // Get user profile
    const response = await authService.getProfile();
    
    dispatch({
      type: USER_LOADED,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    // Check if it's a 401 error (already handled by API interceptor)
    if (error.response && error.response.status === 401) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data?.error || 'Authentication session expired. Please log in again.'
      });
    } else {
      // For other errors, just use generic message
      dispatch({
        type: AUTH_ERROR,
        payload: 'Failed to load user profile.'
      });
    }
    
    return null;
  }
};

// Login user
export const login = (email, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const data = await authService.login(email, password);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });

    // Load user after login
    await dispatch(loadUser());
    
    // Show success message
    dispatch(showToast('Successfully logged in!', 'success'));
    
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials.';
    
    dispatch({
      type: LOGIN_FAIL,
      payload: errorMessage
    });
    
    dispatch(showToast(errorMessage, 'error'));
    
    return { success: false, error: errorMessage };
  }
};

// Register user
export const register = (userData) => async dispatch => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const data = await authService.register(userData);
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });

    // Load user after registration
    await dispatch(loadUser());
    
    // Show success message
    dispatch(showToast('Account created successfully!', 'success'));
    
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
    
    dispatch({
      type: REGISTER_FAIL,
      payload: errorMessage
    });
    
    dispatch(showToast(errorMessage, 'error'));
    
    return { success: false, error: errorMessage };
  }
};

// Logout user
export const logout = () => async dispatch => {
  try {
    await authService.logout();
    
    // First clear the auth state
    dispatch({ type: LOGOUT });
    
    // Then clear user-related state
    dispatch(clearUserState());
    
    // Show logout message
    dispatch(showToast('You have been logged out successfully', 'info'));
  } catch (error) {
    console.error('Logout failed:', error);
    
    // Even if the API call fails, we should still log out locally
    dispatch({ type: LOGOUT });
    dispatch(clearUserState());
    dispatch(showToast('You have been logged out', 'info'));
  }
};

// Handle session expiration (called from API interceptor or manually)
export const handleSessionExpired = (message) => dispatch => {
  dispatch({
    type: AUTH_ERROR,
    payload: message || 'Your session has expired. Please log in again.'
  });
  
  // Clear user state
  dispatch(clearUserState());
};
