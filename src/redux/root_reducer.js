import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {routerReducer as router} from 'react-router-redux';

import {reducer as servers} from 'containers/servers';

export default combineReducers({
  form,
  router,
  servers
});
