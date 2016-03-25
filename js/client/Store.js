import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

const logger = createLogger();

export default createStore(
  reducer,
  applyMiddleware(thunk, logger)
);
