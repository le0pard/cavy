import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './rootReducer'
import {AsyncMiddleware, IpcMiddleware} from './middlewares'

const configureStore = () => {
  const middlewares = [AsyncMiddleware, IpcMiddleware, thunk]

  if (!process.env.WEBPACK_LOGGER_DISABLED)
    middlewares.push(createLogger())

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  )
}

export default configureStore
