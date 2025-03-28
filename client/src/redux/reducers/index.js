import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  auth: authReducer,
  products: productReducer,
  user: userReducer,
  ui: uiReducer
});
