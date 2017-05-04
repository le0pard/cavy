import {ipcRenderer, remote} from 'electron';
import {getIpcActionTypes} from 'shared/ipc';

const winID = remote.getCurrentWindow().id;
const actionTypes = getIpcActionTypes(winID);

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

    const newAction ={
      ...rest,
      type: ipcRequest,
      ipcSuccess,
      ipcFailure
    };

    ipcRenderer.send(actionTypes.IPC_CHANNEL, newAction);
    return dispatch(newAction);
  };
};

export default IpcMiddleware;
