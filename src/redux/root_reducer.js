import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {routerReducer as router} from 'react-router-redux';

import {reducer as dbCredentials} from 'containers/db_credentials';

export default combineReducers({
  form,
  router,
  dbCredentials
});
