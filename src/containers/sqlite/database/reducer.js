import actionTypes from './action_types';
import credentailsActionTypes from 'containers/sqlite/credentials/action_types';

const initialState = {
  tables: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case credentailsActionTypes.SQLITE_CREDENTIALS_DATABASE_REQUEST_SUCCESS: {
      const {result: {tables}} = action;
      return {
        ...state,
        tables
      };
    }
    default:
      return state;
  }
};

export default reducer;
