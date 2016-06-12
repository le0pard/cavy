import assign from 'lodash/object/assign'

// example of usage
// export function loadComments(postId) {
//   return {
//     types: ['LOAD_COMMENTS_REQUEST', 'LOAD_COMMENTS_SUCCESS', 'LOAD_COMMENTS_FAILURE'],
//     shouldCallAPI: (state) => !state.comments[postId],
//     callAPI: () => fetch(`http://myapi.com/posts/${postId}/comments`),
//     payload: { postId }
//   }
// }
//
// export function addComment(postId, message) {
//   return {
//     types: ['ADD_COMMENT_REQUEST', 'ADD_COMMENT_SUCCESS', 'ADD_COMMENT_FAILURE'],
//     callAPI: () => fetch(`http://myapi.com/posts/${postId}/comments`, {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ message })
//     }),
//     payload: { postId, message }
//   }
// }

const ApiMiddleware = ({dispatch, getState}) => {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    } = action

    if (!types)
      // Normal action: pass it on
      return next(action)

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    )
      throw new Error('Expected an array of three string types')

    if (typeof callAPI !== 'function')
      throw new Error('Expected fetch to be a function.')

    if (!shouldCallAPI(getState()))
      return null

    const [requestType, successType, failureType] = types

    dispatch(assign({}, payload, {
      type: requestType
    }))

    return callAPI().then(
      response => dispatch(assign({}, payload, {
        response,
        type: successType
      })),
      error => dispatch(assign({}, payload, {
        error,
        type: failureType
      }))
    )
  }
}

export default ApiMiddleware
