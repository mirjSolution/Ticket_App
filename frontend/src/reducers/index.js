import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import events from './events';
import orders from './orders';

export default combineReducers({
  alert,
  auth,
  events,
  orders,
});
