import {PG_TYPE, SQLITE_TYPE} from 'shared/constants';

let serverConnections = {};

export const connectToServer = ({args, winID, handleSuccessResponse, handleErrorResponse}) => {
  switch (args.dbType) {
    case PG_TYPE: {
      return handleSuccessResponse({pong: 124});
    }
    case SQLITE_TYPE: {
      return handleSuccessResponse({pong: 1243});
    }
    default: {
      return handleSuccessResponse({pong: 234});
    }
  }
};
