import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {routerReducer as router} from 'react-router-redux';

import {reducer as sqlite} from 'containers/sqlite';

export default combineReducers({
  form,
  router,
  sqlite
});
