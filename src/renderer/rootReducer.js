import {combineReducers} from 'redux'
import dbConnections from './containers/dbConnections'

const rootReducer = combineReducers({
  [dbConnections.constants.NAMESPACE]: dbConnections.reducer
})

export default rootReducer
