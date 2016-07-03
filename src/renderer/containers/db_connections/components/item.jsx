import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as actions from '../actions'
import DatabaseItem from 'renderer/containers/database/components/item'

const {PropTypes} = React

class DbConnectionsItem extends React.Component {
  static propTypes = {
    database: PropTypes.shape({
      id: PropTypes.number.isRequired,
      dbType: PropTypes.string.isRequired,
      dbName: PropTypes.string,
      dbs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
      }))
    }).isRequired,
    selectedDatabase: PropTypes.shape({
      id: PropTypes.number.isRequired,
      dbType: PropTypes.string.isRequired,
      dbName: PropTypes.string
    }),
    actions: PropTypes.shape({
      selectDatabase: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    const {database} = this.props
    const {id, dbType, dbName, dbs} = database
    return (
      <li>
        <Link onClick={this.selectDatabase.bind(this)} to={`/databases/${id}`}>ID: {id}, {dbType}, {dbName}</Link>
        <div>
          {dbs && dbs.map((db) => <DatabaseItem key={db.name} db={db} />)}
        </div>
      </li>
    )
  }

  selectDatabase() {
    const {database} = this.props
    this.props.actions.selectDatabase(database)
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DbConnectionsItem)
