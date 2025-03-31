import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAIL,
  COMPARE_PRODUCTS_REQUEST,
  COMPARE_PRODUCTS_SUCCESS,
  COMPARE_PRODUCTS_FAIL,
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
  CLEAR_COMPARE
} from './types';
import * as productService from '../../services/productService';
import { showToast } from './uiActions';

// Fetch all products
export const fetchProducts = (page = 1, limit = 10, category = '', brand = '') => async dispatch => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });

  try {
    const data = await productService.getProducts(page, limit, category, brand);
    
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: error.response?.data?.error || 'Failed to fetch products'
    });
  }
};

// Fetch single product
export const fetchProduct = (id) => async dispatch => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });

  try {
    const data = await productService.getProduct(id);
    
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_FAIL,
      payload: error.response?.data?.error || 'Failed to fetch product'
    });
  }
};

// Search products
export const searchProducts = (query) => async dispatch => {
  dispatch({ type: SEARCH_PRODUCTS_REQUEST });

  try {
    const data = await productService.searchProducts(query);
    
    dispatch({
      type: SEARCH_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCTS_FAIL,
      payload: error.response?.data?.error || 'Failed to search products'
    });
  }
};

// Compare products
export const compareProducts = (productIds) => async dispatch => {
  dispatch({ type: COMPARE_PRODUCTS_REQUEST });

  try {
    const data = await productService.compareProducts(productIds);
    
    dispatch({
      type: COMPARE_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: COMPARE_PRODUCTS_FAIL,
      payload: error.response?.data?.error || 'Failed to compare products'
    });
  }
};

// Add product to comparison
export const addToCompare = (product) => (dispatch, getState) => {
  const { compareList } = getState().products;
  
  // Check if the product is already in the comparison list
  if (compareList.some(item => item.id === product.id)) {
    dispatch(showToast('Product already in comparison list', 'info'));
    return;
  }
  
  // Check if we already have 4 products (limit for comparison)
  if (compareList.length >= 4) {
    dispatch(showToast('You can compare up to 4 products at once', 'warning'));
    return;
  }
  
  dispatch({
    type: ADD_TO_COMPARE,
    payload: product
  });
  
  dispatch(showToast(`${product.name} added to comparison`, 'success'));
};

// Remove product from comparison
export const removeFromCompare = (productId) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_COMPARE,
    payload: productId
  });
  
  dispatch(showToast('Product removed from comparison', 'success'));
};

// Clear comparison list
export const clearCompare = () => (dispatch) => {
  dispatch({
    type: CLEAR_COMPARE
  });
  
  dispatch(showToast('Comparison list cleared', 'info'));
};
