import React from 'react'
import dbConnections from '../containers/dbConnections'

const {DbConnectionView} = dbConnections.components

class Test extends React.Component {

  render() {
    return (
      <div>
        <h1>Cavy! here</h1>
        <DbConnectionView />
      </div>
    )
  }
}

export default Test
