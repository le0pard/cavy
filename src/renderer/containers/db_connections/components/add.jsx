import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {NAMESPACE} from '../constants'

const {PropTypes} = React

class DbConnectionsAdd extends React.Component {
  static propTypes = {
    [NAMESPACE]: PropTypes.shape({
      addFormFields: PropTypes.shape({
        dbType: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    actions: PropTypes.shape({
      addFieldChanged: PropTypes.func.isRequired,
      addNewDatabase: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    const {
      dbType, dbName,
      hostname, port,
      username, password
    } = this.props[NAMESPACE].addFormFields
    const onFieldChanged = this.onFieldChanged.bind(this)

    return (
      <div>
        <h2>Add new database connection</h2>
        <form onSubmit={this.onAddConnection.bind(this)}>
          <div>
            <label htmlFor='dbTypeField'>Database Type</label>
            <select id='dbTypeField' name='dbType' defaultValue={dbType} onChange={onFieldChanged}>
              <option value='pg'>PostgreSQL</option>
              <option value='mysql'>MySQL</option>
              <option value='sqlite'>Sqlite</option>
            </select>
          </div>
          <div>
            <label htmlFor='dbNameField'>Name</label>
            <input id='dbNameField' name='dbName' type='text' maxlength='255' defaultValue={dbName} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='hostnameField'>Hostname</label>
            <input id='hostnameField' name='hostname' type='text' maxlength='255' defaultValue={hostname} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='portField'>Port</label>
            <input id='portField' name='port' type='number' maxlength='255' min='0' max='66000' pattern='[0-9]+' defaultValue={port} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='usernameField'>Username</label>
            <input id='usernameField' name='username' type='text' maxlength='255' defaultValue={username} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='paswordField'>Password</label>
            <input id='paswordField' name='password' type='password' maxlength='255' defaultValue={password} onChange={onFieldChanged} />
          </div>
          <div>
            <button>Add database</button>
          </div>
        </form>
      </div>
    )
  }

  onFieldChanged(e) {
    const {name, value} = e.target
    this.props.actions.addFieldChanged({
      name,
      value
    })
  }

  onAddConnection(e) {
    e.preventDefault()
    const fields = this.props[NAMESPACE].addFormFields
    this.props.actions.addNewDatabase(fields)
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
)(DbConnectionsAdd)
