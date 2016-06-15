import React from 'react'
import {connect} from 'react-redux'
import {addDBConnection, IpcConnection} from '../actions'
import {NAMESPACE} from '../constants'

const {PropTypes} = React

class DbConnectionsList extends React.Component {
  static propTypes = {
    [NAMESPACE]:   PropTypes.array.isRequired,
    onClickButton: PropTypes.func.isRequired,
    onClickLink:   PropTypes.func.isRequired
  };

  render() {
    const data = this.props[NAMESPACE]
    const {onClickLink, onClickButton} = this.props

    return (
      <div>
        <h2>Length: {data.length}</h2>
        <a onClick={onClickLink}>Click!</a>
        <button onClick={onClickButton}>Test IPC</button>
      </div>
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
    onClickLink: (e) => {
      e.preventDefault()
      dispatch(addDBConnection('test'))
    },
    onClickButton: (e) => {
      e.preventDefault()
      dispatch(IpcConnection('postgresql'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DbConnectionsList)
