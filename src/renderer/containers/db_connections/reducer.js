import actionTypes from './actionTypes'

const defaultState = {
  isLoading: false,
  databases: [],
  addFormFields: {
    dbType: 'pg',
    dbName: '',
    hostname: 'localhost',
    port: '',
    username: '',
    password: ''
  },
  addFormError: {}
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.DB_CONNECTIONS_ADD_FIELD_CHANGED:
      const oldAddFormFields = state.addFormFields
      const addFormFields = {...oldAddFormFields, [action.field.name]: action.field.value}
      return {...state, ['addFormFields']: addFormFields}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE:
      return {...state, isLoading: true}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE_SUCCESS:
      const {databases} = state
      return {...state, isLoading: false, databases: [...databases, action.response]}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE_ERROR:
      return {...state, isLoading: false}
    default:
      return state
  }
}

export default reducer
