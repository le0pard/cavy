import {combineReducers} from 'redux';
import {reducer as credentials} from './credentials';
import {reducer as database} from './database';

export default combineReducers({
  credentials,
  database
});
