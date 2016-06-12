import assign from 'lodash/object/assign'
import channels from 'constants/ipc'
import {ipcRenderer} from 'electron'
import uuid from 'node-uuid'

let ipcRequestQueue = {}

const IpcMiddleware = ({dispatch, getState}) => {

  const isHaveIpcRequest = (response) => {
    return response && response.ipcRequestId && ipcRequestQueue[response.ipcRequestId]
  }

  const cleanupIpcRequest = (ipcRequestId) => {
    delete ipcRequestQueue[ipcRequestId]
  }

  ipcRenderer.on(channels.IPC_SUCCESS_CHANNEL, (event, response) => {
    if (isHaveIpcRequest(response)) {
      dispatch({
        type: ipcRequestQueue[response.ipcRequestId].successType,
        response
      })
      cleanupIpcRequest(response.ipcRequestId)
    }
  })

  ipcRenderer.on(channels.IPC_ERROR_CHANNEL, (event, error) => {
    if (isHaveIpcRequest(error)) {
      dispatch({
        type: ipcRequestQueue[error.ipcRequestId].failureType,
        error
      })
      cleanupIpcRequest(error.ipcRequestId)
    }
  })

  return next => action => {
    const {
      ipcTypes,
      ...rest
    } = action

    if (!ipcTypes)
      // Normal action: pass it on
      return next(action)

    if (
      !Array.isArray(ipcTypes) ||
      ipcTypes.length !== 3 ||
      !ipcTypes.every(type => typeof type === 'string')
    )
      throw new Error('Expected an array of three string types')


    const [requestType, successType, failureType] = ipcTypes

    const ipcRequestId = uuid.v4()
    const newAction = assign({}, rest, {ipcRequestId})

    ipcRequestQueue = {
      ...ipcRequestQueue,
      [ipcRequestId]: {
        successType,
        failureType
      }
    }

    ipcRenderer.send(channels.IPC_CHANNEL, newAction)

    return dispatch(assign({}, rest, {
      type: requestType
    }))
  }
}

export default IpcMiddleware
