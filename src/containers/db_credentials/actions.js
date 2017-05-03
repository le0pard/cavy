import actionTypes from './action_types';

export const dbCredentialsConnect = () => ({
  ipcTypes: [
    actionTypes.DB_CREDENTIALS_CONNECT_REQUEST,
    actionTypes.DB_CREDENTIALS_CONNECT_REQUEST_SUCCESS,
    actionTypes.DB_CREDENTIALS_CONNECT_REQUEST_ERROR
  ],
  ping: true
});
