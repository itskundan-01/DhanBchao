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
} from '../actions/types';

const initialState = {
  profile: null,
  watchlist: [],
  history: [],
  notifications: [],
  loading: {
    profile: false,
    password: false,
    watchlist: false
  },
  success: {
    profile: false,
    password: false
  },
  error: null
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, profile: true },
        success: { ...state.success, profile: false },
        error: null
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, profile: false },
        success: { ...state.success, profile: true },
        profile: payload.data
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: { ...state.loading, profile: false },
        success: { ...state.success, profile: false },
        error: payload
      };
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, password: true },
        success: { ...state.success, password: false },
        error: null
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, password: false },
        success: { ...state.success, password: true }
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: { ...state.loading, password: false },
        success: { ...state.success, password: false },
        error: payload
      };
    case FETCH_WATCHLIST_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, watchlist: true },
        error: null
      };
    case FETCH_WATCHLIST_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, watchlist: false },
        watchlist: payload.data
      };
    case FETCH_WATCHLIST_FAIL:
      return {
        ...state,
        loading: { ...state.loading, watchlist: false },
        error: payload
      };
    case CLEAR_USER_STATE:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
