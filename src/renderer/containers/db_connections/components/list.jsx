import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {NAMESPACE} from '../constants'
import DBItem from './item'

const {PropTypes} = React

class DbConnectionsList extends React.Component {
  static propTypes = {
    databases: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      loadDatabases: PropTypes.func.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.props.actions.loadDatabases()
  }

  render() {
    const {databases} = this.props

    return (
      <ul>
        {databases.map((database) => <DBItem key={database.id} database={database} />)}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  const {databases} = state[NAMESPACE]
  return {
    databases
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
)(DbConnectionsList)
