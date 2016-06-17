import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {NAMESPACE} from '../constants'

const {PropTypes} = React

class DbConnectionsAdd extends React.Component {
  static propTypes = {
    addFormFields: PropTypes.shape({
      dbType: PropTypes.string.isRequired,
      dbName: PropTypes.string.isRequired,
      hostname: PropTypes.string.isRequired,
      port: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      database: PropTypes.string.isRequired
    }).isRequired,
    actions: PropTypes.shape({
      addFieldChanged: PropTypes.func.isRequired,
      addNewDatabase: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    const {addFormFields} = this.props
    const onFieldChanged = this.onFieldChanged.bind(this)

    return (
      <div>
        <h2>Add new database connection</h2>
        <form onSubmit={this.onAddConnection.bind(this)}>
          <div>
            <label htmlFor='dbTypeField'>Database Type</label>
            <select id='dbTypeField' name='dbType' defaultValue={addFormFields.dbType} onChange={onFieldChanged}>
              <option value='pg'>PostgreSQL</option>
              <option value='mysql'>MySQL</option>
              <option value='sqlite'>Sqlite</option>
            </select>
          </div>
          <div>
            <label htmlFor='dbNameField'>Name</label>
            <input id='dbNameField' name='dbName' type='text' maxLength='255' defaultValue={addFormFields.dbName} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='hostnameField'>Hostname</label>
            <input id='hostnameField' name='hostname' type='text' maxLength='255' defaultValue={addFormFields.hostname} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='portField'>Port</label>
            <input id='portField' name='port' type='number' maxLength='255' min='0' max='66000' pattern='[0-9]+' defaultValue={addFormFields.port} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='usernameField'>Username</label>
            <input id='usernameField' name='username' type='text' maxLength='255' defaultValue={addFormFields.username} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='paswordField'>Password</label>
            <input id='paswordField' name='password' type='password' maxLength='255' defaultValue={addFormFields.password} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='databaseField'>Database</label>
            <input id='databaseField' name='database' type='text' maxLength='255' defaultValue={addFormFields.database} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='socketField'>Socket</label>
            <input id='socketField' name='socket' type='text' maxLength='255' defaultValue={addFormFields.socket} onChange={onFieldChanged} />
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
    const {actions} = this.props
    actions.addFieldChanged({
      name,
      value
    })
  }

  onAddConnection(e) {
    e.preventDefault()
    const {addFormFields, actions} = this.props
    actions.addNewDatabase(addFormFields)
  }
}

const mapStateToProps = (state) => {
  const {addFormFields} = state[NAMESPACE]
  return {
    addFormFields
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
