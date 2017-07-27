import {PG_TYPE, SQLITE_TYPE} from 'shared/constants';
import {connectToServer} from '../drivers/sqlite';

let serverConnections = {};

export const connectToSqliteServer = ({args, winID, handleSuccessResponse, handleErrorResponse}) => {
  const {folder} = args.params;
  return connectToServer(folder).then(({databases, extension}) => {
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
};
