import actionTypes from './action_types';

export const selectSqliteFolder = (folder) => ({
  type: actionTypes.SQLITE_CREDENTIALS_SELECT_FOLDER,
  folder
});

export const connectToServer = (params) => ({
  ipcTypes: [
    actionTypes.SQLITE_CREDENTIALS_CONNECT_REQUEST,
    actionTypes.SQLITE_CREDENTIALS_CONNECT_REQUEST_SUCCESS,
    actionTypes.SQLITE_CREDENTIALS_CONNECT_REQUEST_ERROR
  ],
  params
});
