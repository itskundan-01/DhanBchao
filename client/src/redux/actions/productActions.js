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
  COMPARE_PRODUCTS_FAIL
} from './types';
import * as productService from '../../services/productService';

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
