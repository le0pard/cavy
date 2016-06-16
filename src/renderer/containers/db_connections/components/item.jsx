import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

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
        <Link to={`/databases/${id}`}>ID: {id}, {dbType}, {dbName}</Link>
      </div>
    )
  }
}


export default connect()(DbConnectionsItem)
