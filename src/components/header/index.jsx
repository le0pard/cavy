import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as credentialsActions} from 'containers/sqlite/credentials';

import './index.sass';

class Header extends React.Component {
  static propTypes = {
    credentials: PropTypes.shape({
      selectedDatabase: PropTypes.string,
      databases: PropTypes.arrayOf(PropTypes.string)
    }),
    actions: PropTypes.shape({
      connectToDatabase: PropTypes.func.isRequired
    }).isRequired
  }

  selectDatabase(database) {
    this.props.actions.connectToDatabase(database.value);
  }

  renderDatabaseSelector(databases) {
    const {selectedDatabase} = this.props.credentials;
    const selectDatabases = databases.map((database) => {
      return {
        label: database,
        value: database
      };
    });

    return (
      <div>
        <Select
          name="database"
          options={selectDatabases}
          value={selectedDatabase}
          clearable={false}
          onChange={this.selectDatabase.bind(this)}
        />
      </div>
    );
  }

  render() {
    const {classes, credentials: {databases}} = this.props;

    return (
      <header>
        {databases && this.renderDatabaseSelector(databases)}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.sqlite.credentials
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(credentialsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
