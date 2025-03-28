import {
  SHOW_TOAST,
  CLEAR_TOAST,
  SET_LOADING,
  CLEAR_LOADING
} from '../actions/types';

const initialState = {
  toast: {
    open: false,
    message: '',
    severity: 'info',
    duration: 3000
  },
  loading: {}
};

const uiReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_TOAST:
      return {
        ...state,
        toast: {
          open: true,
          message: payload.message,
          severity: payload.severity,
          duration: payload.duration
        }
      };

    case CLEAR_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          open: false
        }
      };

    case SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.key]: payload.isLoading
        }
      };

    case CLEAR_LOADING:
      const newLoading = { ...state.loading };
      delete newLoading[payload.key];
      
      return {
        ...state,
        loading: newLoading
      };

    default:
      return state;
  }
};

export default uiReducer;
