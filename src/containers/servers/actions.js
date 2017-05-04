import actionTypes from './action_types';

export const serverConnect = () => ({
  ipcTypes: [
    actionTypes.SERVERS_CONNECT_REQUEST,
    actionTypes.SERVERS_CONNECT_REQUEST_SUCCESS,
    actionTypes.SERVERS_CONNECT_REQUEST_ERROR
  ],
  ping: true
});
