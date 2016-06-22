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
    databases: PropTypes.array.isRequired,
    databaseId: PropTypes.number.isRequired,
    databasesLoader: PropTypes.bool.isRequired,
    selectedDatabase: PropTypes.shape({
      id: PropTypes.number.isRequired
    }),
    actions: PropTypes.shape({
      connectToDatabase: PropTypes.func.isRequired,
      selectDatabase: PropTypes.func.isRequired
    }).isRequired
  };

  componentWillMount() {
    this.selectDatabase(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.databasesLoader !== this.props.databasesLoader)
      this.selectDatabase(nextProps)
  }

  selectDatabase(props) {
    const {selectedDatabase, databases, databasesLoader, databaseId} = props
    if (!databasesLoader && !selectedDatabase) {
      const database = _find(databases, {id: databaseId})
      if (database)
        props.actions.selectDatabase(database)
    }
  }

  render() {
    const {selectedDatabase, databasesLoader} = this.props
    if (databasesLoader)
      return (<Loader />)

    if (!selectedDatabase)
      return this.renderNotFoundDatabase()

    return (
      <div>
        <p>ID: {selectedDatabase.id}, Type: {selectedDatabase.dbType}, Name: {selectedDatabase.dbName}</p>
        <button onClick={this.connectToDatabase.bind(this)}>Test connection</button>
      </div>
    )
  }

  renderNotFoundDatabase() {
    return (
      <div>
        <h2>Database not found</h2>
        <Link to='/'>Go back</Link>
      </div>
    )
  }

  connectToDatabase(e) {
    e.preventDefault()
    const {selectedDatabase} = this.props
    this.props.actions.connectToDatabase(selectedDatabase)
  }
}

const mapStateToProps = (state, {params}) => {
  const {databases, databasesLoader, selectedDatabase} = state[NAMESPACE]
  const databaseId = parseInt(params.id, 10)
  return {
    databases,
    databasesLoader,
    selectedDatabase,
    databaseId
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
