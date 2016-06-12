import actionTypes from './actionTypes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.DB_CONNECTIONS_ADD:
      return [...state, Math.random()]
    default:
      return state
  }
}

export default reducer
