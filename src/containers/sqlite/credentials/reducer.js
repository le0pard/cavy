import actionTypes from './action_types';

const initialState = {
  folder: null,
  extension: 'sqlite3',
  databases: null,
  selectedDatabase: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SQLITE_CREDENTIALS_SELECT_FOLDER: {
      const {folder} = action;
      return {
        ...state,
        folder
      };
    }
    case actionTypes.SQLITE_CREDENTIALS_CONNECT_REQUEST_SUCCESS: {
      const {result: {databases}} = action;
      return {
        ...state,
        databases
      };
    }
    case actionTypes.SQLITE_CREDENTIALS_DATABASE_REQUEST: {
      const {databaseName} = action;
      return {
        ...state,
        selectedDatabase: databaseName
      };
    }
    default:
      return state;
  }
};

export default reducer;
