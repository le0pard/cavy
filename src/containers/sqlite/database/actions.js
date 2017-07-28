import actionTypes from './action_types';

export const selectTable = (tableName) => ({
  ipcTypes: [
    actionTypes.SQLITE_DATABASE_SELECT_TABLE_REQUEST,
    actionTypes.SQLITE_DATABASE_SELECT_TABLE_REQUEST_SUCCESS,
    actionTypes.SQLITE_DATABASE_SELECT_TABLE_REQUEST_ERROR
  ],
  tableName
});
