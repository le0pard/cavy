import {actionTypes as credentialsActionTypes} from './credentials';
import {actionTypes as databaseActionTypes} from './database';

const actionTypes = {
  ...credentialsActionTypes,
  ...databaseActionTypes
};

export default actionTypes;
