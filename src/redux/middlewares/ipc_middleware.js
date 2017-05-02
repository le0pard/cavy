import keyMirror from 'fbjs/lib/keyMirror';
import assign from 'lodash/assign';
import _omit from 'lodash/omit';
import {ipcRenderer} from 'electron';
import uuid from 'node-uuid';

const IPC_ACTION_TYPES = keyMirror({
  IPC_CHANNEL:         null, // channel for ipc
  IPC_SUCCESS_CHANNEL: null, // reply success channel for ipc
  IPC_ERROR_CHANNEL:   null  // reply error channel for ipc
});

let ipcRequestQueue = {};

const isHaveIpcRequest = (response) => {
  return response && response.ipcID && typeof ipcRequestQueue[response.ipcID] !== 'undefined';
};

const omitIpcRequest = (ipcID) => {
  return _omit(ipcRequestQueue, ipcID);
};

const IpcMiddleware = ({dispatch}) => {
  ipcRenderer.on(IPC_ACTION_TYPES.IPC_SUCCESS_CHANNEL, (event, response) => {
    if (isHaveIpcRequest(response)) {
      dispatch({
        type: ipcRequestQueue[response.ipcID].successType,
        response
      });
      ipcRequestQueue = omitIpcRequest(response.ipcID);
    }
  });

  ipcRenderer.on(IPC_ACTION_TYPES.IPC_ERROR_CHANNEL, (event, error) => {
    if (isHaveIpcRequest(error)) {
      dispatch({
        type: ipcRequestQueue[error.ipcID].failureType,
        error
      });
      ipcRequestQueue = omitIpcRequest(error.ipcID);
    }
  });

  return next => action => {
    const {
      ipcTypes,
      ...rest
    } = action;

    if (!ipcTypes) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(ipcTypes) ||
      ipcTypes.length !== 3 ||
      !ipcTypes.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types');
    }

    const [requestType, successType, failureType] = ipcTypes;

    const ipcID = uuid.v4();
    const newAction = assign({}, rest, {ipcID});

    ipcRequestQueue = {
      ...ipcRequestQueue,
      [ipcID]: {
        successType,
        failureType
      }
    };

    ipcRenderer.send(IPC_ACTION_TYPES.IPC_CHANNEL, newAction);

    return dispatch(assign({}, rest, {
      type: requestType
    }));
  };
};

export default IpcMiddleware;
