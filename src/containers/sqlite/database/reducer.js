import actionTypes from './action_types';
import credentailsActionTypes from 'containers/sqlite/credentials/action_types';

const initialState = {
  tables: null,
  views: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case credentailsActionTypes.SQLITE_CREDENTIALS_DATABASE_REQUEST_SUCCESS: {
      const {result: {tables, views}} = action;
      return {
        ...state,
        tables,
        views
      };
    }
    default:
      return state;
  }
};

export default reducer;
