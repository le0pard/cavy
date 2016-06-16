import React from 'react'
import {DbConnectionsAdd} from '../containers/db_connections/components'

class IndexPage extends React.Component {

  render() {
    return (
      <div>
        <DbConnectionsAdd />
      </div>
    )
  }
}

export default IndexPage
