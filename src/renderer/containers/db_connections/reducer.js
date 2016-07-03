import actionTypes from './actionTypes'
import defaultState from './reducerDefaultState'

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.DB_CONNECTIONS_ADD_FIELD_CHANGED: {
      const {fields} = addForm
      const field = fields[action.field.name]
      return {...state,
        addForm: {...addForm,
          fields: {...fields,
            [action.field.name]: {
              ...field, value: action.field.value
            }
          }
        }
      }
    }
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE: {
      const {databases, addForm} = state
      return {...state, addForm: {...addForm, loader: true}}
    }
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE_SUCCESS: {
      const {databases, addForm} = state
      return {...state, addForm: {...addForm, loader: false}, databases: [...databases, action.response]}
    }
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE_ERROR: {
      const {databases, addForm} = state
      return {...state, addForm: {...addForm, loader: false}}
    }
    case actionTypes.DB_CONNECTIONS_LOAD_DATABASES: {
      return {...state, databasesLoader: true}
    }
    case actionTypes.DB_CONNECTIONS_LOAD_DATABASES_SUCCESS: {
      const {response} = action
      return {...state, databasesLoader: false, databases: response}
    }
    case actionTypes.DB_CONNECTIONS_LOAD_DATABASES_ERROR: {
      return {...state, databasesLoader: false}
    }
    case actionTypes.DB_CONNECTIONS_SELECTED_DATABASE: {
      const {database} = action
      return {...state, selectedDatabase: database}
    }
    case actionTypes.DB_CONNECTIONS_IPC_CONNECT_SUCCESS: {
      const {response} = action
      const {database, version} = response
      const databases = state.databases.map((db) => {
        if (db.id === database.id)
          return {...database, version}
        else
          return db
      })
      return {...state, databases}
    }
    default:
      return state
  }
}

export default reducer
