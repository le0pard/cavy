import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import * as actions from '../actions'
import {NAMESPACE} from '../constants'
import _find from 'lodash/collection/find'

const {PropTypes} = React

class DbConnectionsShow extends React.Component {
  static propTypes = {
    [NAMESPACE]: PropTypes.shape({
      databases: PropTypes.array.isRequired,
      loaders: PropTypes.shape({
        list: PropTypes.bool.isRequired
      }).isRequired
    }).isRequired,
    databaseId: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      connectToDatabase: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    const {databases} = this.props[NAMESPACE]
    const {list} = this.props[NAMESPACE].loaders
    if (list || !databases.length)
      return (<div>Loading...</div>)

    const {databaseId} = this.props
    const database = _find(databases, {id: parseInt(databaseId, 10)})
    return (
      <div>
        <p>ID: {database.id}, Type: {database.dbType}, Name: {database.dbName}</p>
        <button onClick={this.connectToDatabase.bind(this)}>Test connection</button>
      </div>
    )
  }

  connectToDatabase(e) {
    e.preventDefault()
    const {databases} = this.props[NAMESPACE]
    const {databaseId} = this.props
    const database = _find(databases, {id: parseInt(databaseId, 10)})
    this.props.actions.connectToDatabase(database)
  }
}

const mapStateToProps = (state, {params}) => {
  return {
    [NAMESPACE]: state[NAMESPACE],
    databaseId: params.id
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
