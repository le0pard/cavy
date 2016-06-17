import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {NAMESPACE} from '../constants'

const {PropTypes} = React

class DbConnectionsAdd extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      addFieldChanged: PropTypes.func.isRequired,
      addNewDatabase: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    const {fields} = this.props.addForm
    const onFieldChanged = this.onFieldChanged.bind(this)

    return (
      <div>
        <h2>Add new database connection</h2>
        <form onSubmit={this.onAddConnection.bind(this)}>
          <div>
            <label htmlFor='dbTypeField'>Database Type</label>
            <select id='dbTypeField' name='dbType' defaultValue={fields.dbType.defaultValue} onChange={onFieldChanged}>
              <option value='pg'>PostgreSQL</option>
              <option value='mysql'>MySQL</option>
              <option value='sqlite'>Sqlite</option>
            </select>
          </div>
          <div>
            <label htmlFor='dbNameField'>Name</label>
            <input id='dbNameField' name='dbName' type='text' maxLength='255' defaultValue={fields.dbName.defaultValue} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='hostnameField'>Hostname</label>
            <input id='hostnameField' name='hostname' type='text' maxLength='255' defaultValue={fields.hostname.defaultValue} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='portField'>Port</label>
            <input id='portField' name='port' type='number' maxLength='255' min='0' max='66000' pattern='[0-9]+' defaultValue={fields.port.defaultValue} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='usernameField'>Username</label>
            <input id='usernameField' name='username' type='text' maxLength='255' defaultValue={fields.username.defaultValue} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='paswordField'>Password</label>
            <input id='paswordField' name='password' type='password' maxLength='255' defaultValue={fields.password.defaultValue} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='databaseField'>Database</label>
            <input id='databaseField' name='database' type='text' maxLength='255' defaultValue={fields.database.defaultValue} onChange={onFieldChanged} />
          </div>
          <div>
            <label htmlFor='socketField'>Socket</label>
            <input id='socketField' name='socket' type='text' maxLength='255' defaultValue={fields.socket.defaultValue} onChange={onFieldChanged} />
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
    const {addForm, actions} = this.props
    const values = Object.keys(addForm.fields).reduce((agr, key) => {
      agr[key] = addForm.fields[key].value
      return agr
    }, {})
    actions.addNewDatabase(values)
  }
}

const mapStateToProps = (state) => {
  const {addForm} = state[NAMESPACE]
  return {
    addForm
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
