import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  user: userReducer,
});

export default rootReducer;
