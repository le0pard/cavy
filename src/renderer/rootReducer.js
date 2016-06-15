import {combineReducers} from 'redux'
import dbConnections from './containers/db_connections'

const rootReducer = combineReducers({
  [dbConnections.constants.NAMESPACE]: dbConnections.reducer
})

export default rootReducer
