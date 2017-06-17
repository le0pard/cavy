import {TYPE_KEY, PG_TYPE, SQLITE_TYPE} from 'shared/constants';
import {connectToSqliteServer} from '../drivers/sqlite3';

let serverConnections = {};

export const connectToServer = ({args, winID, handleSuccessResponse, handleErrorResponse}) => {
  switch (args[TYPE_KEY]) {
    case PG_TYPE: {
      return handleSuccessResponse({});
    }
    case SQLITE_TYPE: {
      const {folder} = args.params;
      return connectToSqliteServer(folder).then(({databases, extension}) => {
        const result = {
          folder,
          databases,
          extension
        };
        serverConnections = {
          ...serverConnections,
          [winID]: result
        };
        return handleSuccessResponse(result);
      }).catch((error) => {
        return handleErrorResponse(error);
      });
    }
    default: {
      return handleSuccessResponse({pong: true});
    }
  }
};
