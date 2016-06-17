import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router'
import Loader from 'renderer/components/loader'
import * as actions from '../actions'
import {NAMESPACE} from '../constants'
import _find from 'lodash/collection/find'

const {PropTypes} = React

class DbConnectionsShow extends React.Component {
  static propTypes = {
    loaders: PropTypes.shape({
      list: PropTypes.bool.isRequired
    }).isRequired,
    database: PropTypes.shape({
      id: PropTypes.number.isRequired
    }),
    databaseId: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      connectToDatabase: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    const {database, loaders} = this.props
    if (loaders.list)
      return (<Loader />)

    if (!database)
      return this.renderNotFoundDatabase()

    return (
      <div>
        <p>ID: {database.id}, Type: {database.dbType}, Name: {database.dbName}</p>
        <button onClick={this.connectToDatabase.bind(this)}>Test connection</button>
      </div>
    )
  }

  renderNotFoundDatabase() {
    const {databaseId} = this.props
    return (
      <div>
        <h2>Database not found (ID: {databaseId})</h2>
        <Link to='/'>Go back</Link>
      </div>
    )
  }

  connectToDatabase(e) {
    e.preventDefault()
    const {database} = this.props
    this.props.actions.connectToDatabase(database)
  }
}

const mapStateToProps = (state, {params}) => {
  const {databases, loaders} = state[NAMESPACE]
  const databaseId = parseInt(params.id, 10)
  const database = _find(databases, {id: databaseId})
  return {
    loaders,
    databaseId,
    database
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DbConnectionsShow))
