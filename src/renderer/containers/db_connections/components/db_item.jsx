import React from 'react'
import {connect} from 'react-redux'

class DbConnectionsItem extends React.Component {
  render() {
    return (
      <div>
        <h2>DB item</h2>
      </div>
    )
  }
}


export default connect()(DbConnectionsItem)
