import assign from 'lodash/object/assign'
import ipcChannels from 'constants/ipc_channels'
import {ipcRenderer} from 'electron'
import uuid from 'node-uuid'

let ipcRequestQueue = {}

const IpcMiddleware = ({dispatch, getState}) => {

  const isHaveIpcRequest = (ipcRequestId) => {
    return ipcRequestId && ipcRequestQueue[ipcRequestId]
  }

  const cleanupIpcRequest = (ipcRequestId) => {
    delete ipcRequestQueue[ipcRequestId]
  }

  ipcRenderer.on(ipcChannels.IPC_SUCCESS_CHANNEL, (event, response) => {
    const {ipcRequestId, ...rest} = response
    if (isHaveIpcRequest(ipcRequestId)) {
      dispatch({
        type: ipcRequestQueue[ipcRequestId].successType,
        response: rest
      })
      cleanupIpcRequest(ipcRequestId)
    }
  })

  ipcRenderer.on(ipcChannels.IPC_ERROR_CHANNEL, (event, error) => {
    const {ipcRequestId, ...rest} = error
    if (isHaveIpcRequest(ipcRequestId)) {
      dispatch({
        type: ipcRequestQueue[ipcRequestId].failureType,
        error: rest
      })
      cleanupIpcRequest(ipcRequestId)
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

    if (typeof rest.ipcAction === 'undefined')
      throw new Error('Expected ipcAction attribute.')


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

    ipcRenderer.send(ipcChannels.IPC_REQUEST_CHANNEL, newAction)

    return dispatch(assign({}, rest, {
      type: requestType
    }))
  }
}

export default IpcMiddleware
