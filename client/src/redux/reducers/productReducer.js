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
} from '../actions/types';

const initialState = {
  products: [],
  product: null,
  searchResults: [],
  comparisonProducts: [],
  compareList: [], // For locally stored products for comparison
  loading: {
    products: false,
    product: false,
    search: false,
    compare: false
  },
  pagination: {
    current: 1,
    limit: 10,
    total: 0,
    pages: 0
  },
  error: null
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, products: true },
        error: null
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, products: false },
        products: payload.data,
        pagination: payload.pagination || state.pagination
      };
    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: { ...state.loading, products: false },
        error: payload
      };
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, product: true },
        error: null
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, product: false },
        product: payload.data
      };
    case FETCH_PRODUCT_FAIL:
      return {
        ...state,
        loading: { ...state.loading, product: false },
        error: payload
      };
    case SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, search: true },
        error: null
      };
    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, search: false },
        searchResults: payload.data
      };
    case SEARCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: { ...state.loading, search: false },
        error: payload
      };
    case COMPARE_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, compare: true },
        error: null
      };
    case COMPARE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, compare: false },
        comparisonProducts: payload.data
      };
    case COMPARE_PRODUCTS_FAIL:
      return {
        ...state,
        loading: { ...state.loading, compare: false },
        error: payload
      };
    case ADD_TO_COMPARE:
      return {
        ...state,
        compareList: [...state.compareList, payload]
      };
    case REMOVE_FROM_COMPARE:
      return {
        ...state,
        compareList: state.compareList.filter(product => product.id !== payload)
      };
    case CLEAR_COMPARE:
      return {
        ...state,
        compareList: []
      };
    default:
      return state;
  }
};

export default productReducer;
