import assign from 'lodash/assign';
import _omit from 'lodash/omit';
import {ipcRenderer} from 'electron';
import uuid from 'node-uuid';
import {actionTypes} from 'shared/ipc';

let ipcRequestQueue = {};

const isHaveIpcRequest = (ipcUUID) => {
  return typeof ipcRequestQueue[ipcUUID] !== 'undefined';
};

const omitIpcRequest = (ipcUUID) => {
  return _omit(ipcRequestQueue, ipcUUID);
};

const subscribeToIpcSignals = (dispatch) => {
  const schemas = [
    {
      channel: actionTypes.IPC_SUCCESS_CHANNEL,
      resultKey: 'result',
      ipcKey: 'ipcSuccess'
    },
    {
      channel: actionTypes.IPC_ERROR_CHANNEL,
      resultKey: 'error',
      ipcKey: 'ipcFailure'
    }
  ];

  schemas.forEach((schema) => {
    ipcRenderer.on(schema.channel, (event, response) => {
      const {ipcUUID} = response;
      if (isHaveIpcRequest(ipcUUID)) {
        dispatch({
          type: ipcRequestQueue[ipcUUID][schema.ipcKey],
          [schema.resultKey]: response[schema.resultKey]
        });
        ipcRequestQueue = omitIpcRequest(ipcUUID);
      }
    });
  });
};

const IpcMiddleware = ({dispatch}) => {
  subscribeToIpcSignals(dispatch);

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

    const [ipcRequest, ipcSuccess, ipcFailure] = ipcTypes;

    const ipcUUID = uuid.v4();
    const newAction = assign({}, rest, {ipcUUID});

    ipcRequestQueue = {
      ...ipcRequestQueue,
      [ipcUUID]: {
        ipcSuccess,
        ipcFailure
      }
    };

    ipcRenderer.send(actionTypes.IPC_CHANNEL, newAction);

    return dispatch(assign({}, rest, {
      type: ipcRequest
    }));
  };
};

export default IpcMiddleware;
