import actionTypes from './actionTypes'


const defaultState = {
  databases: [],
  databasesLoader: true,

  selectedDatabase: null,

  addFormFields: {
    dbType: 'pg',
    dbName: '',
    hostname: 'localhost',
    port: '5432',
    username: '',
    password: '',
    database: ''
  },
  addFormError: {},
  addFormLoader: false
}



const reducer = (state = defaultState, action) => {
  const {loaders} = state

  switch (action.type) {
    case actionTypes.DB_CONNECTIONS_ADD_FIELD_CHANGED:
      const oldAddFormFields = state.addFormFields
      const addFormFields = {...oldAddFormFields, [action.field.name]: action.field.value}
      return {...state, addFormFields}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE:
      return {...state, addFormLoader: true}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE_SUCCESS:
      const {databases} = state
      return {...state, addFormLoader: false, databases: [...databases, action.response]}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE_ERROR:
      return {...state, addFormLoader: false}
    case actionTypes.DB_CONNECTIONS_LOAD_DATABASES:
      return {...state, databasesLoader: true}
    case actionTypes.DB_CONNECTIONS_LOAD_DATABASES_SUCCESS:
      return {...state, databasesLoader: false, databases: action.response}
    case actionTypes.DB_CONNECTIONS_LOAD_DATABASES_ERROR:
      return {...state, databasesLoader: false}
    case actionTypes.DB_CONNECTIONS_SELECTED_DATABASE:
      const {database} = action
      return {...state, selectedDatabase: database}
    default:
      return state
  }
}

export default reducer
