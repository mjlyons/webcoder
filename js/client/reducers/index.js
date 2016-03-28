import { combineReducers } from 'redux';
import alerts from './AlertReducer';

require('babel-polyfill');

export default combineReducers({
  alerts,
});
