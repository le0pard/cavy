import actionTypes from './action_types';
import {TYPE_KEY} from 'shared/constants';

export const selectSqliteFolder = (folder) => ({
  type: actionTypes.CREDENTIALS_SQLITE_SELECT_FOLDER,
  folder
});

export const connectToServer = (dbType, params) => ({
  [TYPE_KEY]: dbType,
  ipcTypes: [
    actionTypes.CREDENTIALS_CONNECT_REQUEST,
    actionTypes.CREDENTIALS_CONNECT_REQUEST_SUCCESS,
    actionTypes.CREDENTIALS_CONNECT_REQUEST_ERROR
  ],
  params
});
