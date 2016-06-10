import uuid from 'node-uuid'

export function generateDBConnection() {
  return uuid.v4()
}
