import assign from 'lodash/assign';
import {ipcRenderer, remote} from 'electron';
import {actionTypes} from 'shared/ipc';

const winID = remote.getCurrentWindow().id;

const subscribeToIpcSignals = (dispatch) => {
  const schemas = [
    {
      channel: `${actionTypes.IPC_SUCCESS_CHANNEL}_${winID}`,
      resultKey: 'result',
      ipcKey: 'ipcSuccess'
    },
    {
      channel: `${actionTypes.IPC_ERROR_CHANNEL}_${winID}`,
      resultKey: 'error',
      ipcKey: 'ipcFailure'
    }
  ];

  schemas.forEach((schema) => {
    ipcRenderer.on(schema.channel, (event, response) => {
      dispatch({
        type: response[schema.ipcKey],
        [schema.resultKey]: response[schema.resultKey]
      });
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

    const newAction = assign({}, rest, {
      ipcSuccess,
      ipcFailure
    });

    ipcRenderer.send(`${actionTypes.IPC_CHANNEL}_${winID}`, newAction);

    return dispatch(assign({}, rest, {
      type: ipcRequest
    }));
  };
};

export default IpcMiddleware;
