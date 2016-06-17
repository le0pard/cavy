import actionTypes from './actionTypes'

const defaultState = {
  loaders: {
    add: false,
    list: true
  },
  databases: [],
  addFormFields: {
    dbType: 'pg',
    dbName: '',
    hostname: 'localhost',
    port: '5432',
    username: '',
    password: '',
    database: ''
  },
  addFormError: {}
}

const reducer = (state = defaultState, action) => {
  const {loaders} = state

  switch (action.type) {
    case actionTypes.DB_CONNECTIONS_ADD_FIELD_CHANGED:
      const oldAddFormFields = state.addFormFields
      const addFormFields = {...oldAddFormFields, [action.field.name]: action.field.value}
      return {...state, addFormFields}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE:
      return {...state, loaders: {...loaders, add: true}}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE_SUCCESS:
      const {databases} = state
      return {...state, loaders: {...loaders, add: false}, databases: [...databases, action.response]}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE_ERROR:
      return {...state, loaders: {...loaders, add: false}}
    case actionTypes.DB_CONNECTIONS_LOAD_DATABASES:
      return {...state, loaders: {...loaders, list: true}}
    case actionTypes.DB_CONNECTIONS_LOAD_DATABASES_SUCCESS:
      return {...state, loaders: {...loaders, list: false}, databases: action.response}
    case actionTypes.DB_CONNECTIONS_LOAD_DATABASES_ERROR:
      return {...state, loaders: {...loaders, list: false}}
    default:
      return state
  }
}

export default reducer
