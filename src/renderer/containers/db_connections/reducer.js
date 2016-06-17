import actionTypes from './actionTypes'
import defaultState from './reducerDefaultState'

const reducer = (state = defaultState, action) => {
  const {databases, addForm} = state

  switch (action.type) {
    case actionTypes.DB_CONNECTIONS_ADD_FIELD_CHANGED:
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
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE:
      return {...state, addForm: {...addForm, loader: true}}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE_SUCCESS:
      return {...state, addForm: {...addForm, loader: false}, databases: [...databases, action.response]}
    case actionTypes.DB_CONNECTIONS_ADD_DATABASE_ERROR:
      return {...state, addForm: {...addForm, loader: false}}
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
