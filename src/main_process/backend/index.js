import actionTypes from 'containers/action_types';
import {
  connectToSqliteServer,
  connectToSqliteDatabase
} from './sqlite';

export const backendResponse = ({args, winID, handleSuccessResponse, handleErrorResponse}) => {
  switch (args.type) {
    case actionTypes.SQLITE_CREDENTIALS_CONNECT_REQUEST: {
      return connectToSqliteServer({args, winID, handleSuccessResponse, handleErrorResponse});
    }
    case actionTypes.SQLITE_CREDENTIALS_DATABASE_REQUEST: {
      return connectToSqliteDatabase({args, winID, handleSuccessResponse, handleErrorResponse});
    }
    default: {
      return handleSuccessResponse({pong: true});
    }
  }
};
