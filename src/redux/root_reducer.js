import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {routerReducer as router} from 'react-router-redux';

import {reducer as credentials} from 'containers/credentials';

export default combineReducers({
  form,
  router,
  credentials
});
