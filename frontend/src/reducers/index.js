import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import events from './events';
import orders from './orders';
import message from './message';
import purchases from './purchases';

export default combineReducers({
  alert,
  auth,
  events,
  orders,
  message,
  purchases,
});
