import actionTypes from './action_types';

export const selectSqliteFolder = (folder) => ({
  type: actionTypes.CREDENTIALS_SQLITE_SELECT_FOLDER,
  folder
});

export const connectToServer = (params) => ({
  ipcTypes: [
    actionTypes.CREDENTIALS_CONNECT_REQUEST,
    actionTypes.CREDENTIALS_CONNECT_REQUEST_SUCCESS,
    actionTypes.CREDENTIALS_CONNECT_REQUEST_ERROR
  ],
  params
});
