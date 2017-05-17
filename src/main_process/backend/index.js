import actionTypes from 'containers/action_types';
import {connectToServer} from './servers';

export const backendResponse = ({args, winID, handleSuccessResponse, handleErrorResponse}) => {
  switch (args.type) {
    case actionTypes.CREDENTIALS_CONNECT_REQUEST: {
      return connectToServer({args, winID, handleSuccessResponse, handleErrorResponse});
    }
    default: {
      return handleSuccessResponse({pong: true});
    }
  }
};
