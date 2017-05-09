import path from 'path';
import {PG_TYPE, SQLITE_TYPE} from 'shared/constants';
import {connectToSqliteServer} from '../drivers/sqlite3';

let serverConnections = {};

export const connectToServer = ({args, winID, handleSuccessResponse, handleErrorResponse}) => {
  switch (args.dbType) {
    case PG_TYPE: {
      return handleSuccessResponse({pong: 124});
    }
    case SQLITE_TYPE: {
      const {pathname} = args;
      return connectToSqliteServer(pathname).then(({databases, extension}) => {
        const result = {
          pathname,
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
      return handleSuccessResponse({pong: 234});
    }
  }
};
