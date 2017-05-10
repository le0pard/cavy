import actionTypes from './action_types';

const initialState = {
  sqlite: {
    folder: null,
    extension: 'sqlite3'
  },
  pg: {},
  servers: [],
  connection: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREDENTIALS_SQLITE_SELECT_FOLDER: {
      const {folder} = action;
      return {
        ...state,
        sqlite: {
          ...state.sqlite,
          folder
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
