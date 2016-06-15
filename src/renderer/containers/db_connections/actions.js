import actionTypes from './actionTypes'
import {NAMESPACE} from './constants'
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

export const loadDatabases = (fields) => ({
  types: [
    actionTypes.DB_CONNECTIONS_LOAD_DATABASES,
    actionTypes.DB_CONNECTIONS_LOAD_DATABASES_SUCCESS,
    actionTypes.DB_CONNECTIONS_LOAD_DATABASES_ERROR
  ],
  shouldCallAsync: (state) => !state[NAMESPACE].databases.length,
  callAsync: () => localDatabase.loadDatabase()
})
