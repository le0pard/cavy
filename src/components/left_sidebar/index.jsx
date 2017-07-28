import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as credentialsActions} from 'containers/sqlite/credentials';

import './index.sass';

class LeftSidebar extends React.Component {
  static propTypes = {
    database: PropTypes.shape({
      tables: PropTypes.arrayOf(PropTypes.object)
    })
  }

  renderTables() {
    const {tables} = this.props.database;
    if (!tables) return null;

    return (
      <ul>
        {tables.map((table) => {
          return (
            <li key={table.name}>{table.name}</li>
          );
        })}
      </ul>
    );
  }

  render() {

    return (
      <div>
        <h2>Tables</h2>
        {this.renderTables()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  database: state.sqlite.database
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(credentialsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSidebar);
