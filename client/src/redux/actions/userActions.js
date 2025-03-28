import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FETCH_WATCHLIST_REQUEST,
  FETCH_WATCHLIST_SUCCESS,
  FETCH_WATCHLIST_FAIL,
  CLEAR_USER_STATE
} from './types';
import * as userService from '../../services/userService';
import { showToast } from './uiActions';

// Update user profile
export const updateProfile = (userData) => async dispatch => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const data = await userService.updateProfile(userData);
    
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data
    });
    
    dispatch(showToast('Profile updated successfully', 'success'));
    
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to update profile';
    
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: errorMessage
    });
    
    dispatch(showToast(errorMessage, 'error'));
    
    return { success: false, error: errorMessage };
  }
};

// Update password
export const updatePassword = (passwordData) => async dispatch => {
  dispatch({ type: UPDATE_PASSWORD_REQUEST });

  try {
    const data = await userService.updatePassword(passwordData);
    
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data
    });
    
    dispatch(showToast('Password updated successfully', 'success'));
    
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to update password';
    
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: errorMessage
    });
    
    dispatch(showToast(errorMessage, 'error'));
    
    return { success: false, error: errorMessage };
  }
};

// Fetch watchlist
export const fetchWatchlist = () => async dispatch => {
  dispatch({ type: FETCH_WATCHLIST_REQUEST });

  try {
    const data = await userService.getWatchlist();
    
    dispatch({
      type: FETCH_WATCHLIST_SUCCESS,
      payload: data
    });
    
    return { success: true, data: data };
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to fetch watchlist';
    
    dispatch({
      type: FETCH_WATCHLIST_FAIL,
      payload: errorMessage
    });
    
    return { success: false, error: errorMessage };
  }
};

// Add to watchlist
export const addToWatchlist = (productId) => async dispatch => {
  try {
    await userService.addToWatchlist(productId);
    dispatch(fetchWatchlist()); // Refresh the watchlist after adding
    dispatch(showToast('Product added to watchlist', 'success'));
    
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to add item to watchlist';
    dispatch(showToast(errorMessage, 'error'));
    console.error('Failed to add item to watchlist:', error);
    
    return { success: false, error: errorMessage };
  }
};

// Remove from watchlist
export const removeFromWatchlist = (productId) => async dispatch => {
  try {
    await userService.removeFromWatchlist(productId);
    dispatch(fetchWatchlist()); // Refresh the watchlist after removing
    dispatch(showToast('Product removed from watchlist', 'success'));
    
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to remove item from watchlist';
    dispatch(showToast(errorMessage, 'error'));
    console.error('Failed to remove item from watchlist:', error);
    
    return { success: false, error: errorMessage };
  }
};

// Clear user state (used during logout)
export const clearUserState = () => ({
  type: CLEAR_USER_STATE
});
