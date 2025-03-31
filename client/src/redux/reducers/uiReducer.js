import { SHOW_TOAST, CLEAR_TOAST, SET_LOADING, CLEAR_LOADING } from '../actions/types';

const initialState = {
  toast: {
    open: false,
    message: '',
    type: 'info' 
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
          type: payload.type
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
          [payload]: true
        }
      };
    
    case CLEAR_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload]: false
        }
      };
    
    default:
      return state;
  }
};

export default uiReducer;
