import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {NAMESPACE} from '../constants'

const {PropTypes} = React

class DbConnectionsList extends React.Component {
  static propTypes = {
    [NAMESPACE]: PropTypes.object.isRequired
  };

  render() {
    const data = this.props[NAMESPACE]

    return (
      <ul>
        <li>test</li>
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    [NAMESPACE]: state[NAMESPACE]
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
