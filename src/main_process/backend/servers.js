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
      const {filepath} = args;
      return connectToSqliteServer(filepath).then((db) => {
        serverConnections = {
          ...serverConnections,
          [winID]: db
        };
        const dbName = path.basename(filepath, path.extname(filepath));
        return handleSuccessResponse({databases: [dbName]});
      }).catch((error) => {
        return handleErrorResponse(error);
      });
    }
    default: {
      return handleSuccessResponse({pong: 234});
    }
  }
};
