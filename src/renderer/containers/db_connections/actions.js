import actionTypes from './actionTypes'

export const addDBConnection = (text) => ({
  type: actionTypes.DB_CONNECTIONS_ADD,
  text
})

export const IpcConnection = (database) => ({
  ipcTypes: [
    actionTypes.DB_CONNECTIONS_ADD,
    actionTypes.DB_CONNECTIONS_ADD_SUCCESS,
    actionTypes.DB_CONNECTIONS_ADD_ERROR
  ],
  database
})
