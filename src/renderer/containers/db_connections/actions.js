import actionTypes from './actionTypes'
import localDatabase from 'renderer/utils/local_database'

export const addFieldChanged = (field) => ({
  type: actionTypes.DB_CONNECTIONS_ADD_FIELD_CHANGED,
  field
})

export const addNewDatabase = (fields) => ({
  types: [
    actionTypes.DB_CONNECTIONS_ADD_DATABASE,
    actionTypes.DB_CONNECTIONS_ADD_DATABASE_SUCCESS,
    actionTypes.DB_CONNECTIONS_ADD_DATABASE_ERROR
  ],
  shouldCallAsync: () => true,
  callAsync: () => localDatabase.addDatabase(fields)
})
