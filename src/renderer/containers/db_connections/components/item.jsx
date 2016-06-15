import React from 'react'
import {connect} from 'react-redux'

const {PropTypes} = React

class DbConnectionsItem extends React.Component {
  static propTypes = {
    database: PropTypes.shape({
      id: PropTypes.number.isRequired,
      dbType: PropTypes.string.isRequired,
      dbName: PropTypes.string
    }).isRequired
  };

  render() {
    const {id, dbType, dbName} = this.props.database
    return (
      <div>
        <p>ID: {id}, {dbType}, {dbName}</p>
      </div>
    )
  }
}


export default connect()(DbConnectionsItem)
