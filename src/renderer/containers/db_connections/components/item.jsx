import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as actions from '../actions'
import {NAMESPACE} from '../constants'

const {PropTypes} = React

class DbConnectionsItem extends React.Component {
  static propTypes = {
    database: PropTypes.shape({
      id: PropTypes.number.isRequired,
      dbType: PropTypes.string.isRequired,
      dbName: PropTypes.string
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
    const {id, dbType, dbName} = this.props.database
    return (
      <div>
        <Link onClick={this.selectDatabase.bind(this)} to={`/databases/${id}`}>ID: {id}, {dbType}, {dbName}</Link>
      </div>
    )
  }

  selectDatabase(){
    const {database} = this.props
    this.props.actions.selectDatabase(database)
  }
}

const mapStateToProps = (state) => {
  const {selectedDatabase} = state[NAMESPACE]
  return {
    selectedDatabase
  }
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
