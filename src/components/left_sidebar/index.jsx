import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as databaseActions} from 'containers/sqlite/database';

import './index.sass';

class LeftSidebar extends React.Component {
  static propTypes = {
    database: PropTypes.shape({
      tables: PropTypes.arrayOf(PropTypes.object),
      views: PropTypes.arrayOf(PropTypes.object)
    })
  }

  selectTable(table) {
    console.log('Table', table);
  }

  selectView(view) {
    console.log('View', view);
  }

  renderTables() {
    const {tables} = this.props.database;
    if (!tables) return null;

    return (
      <ul>
        {tables.map((table, index) => {
          return (
            <li key={index} onClick={() => this.selectTable(table)}>
              {table.name}
            </li>
          );
        })}
      </ul>
    );
  }

  renderViews() {
    const {views} = this.props.database;
    if (!views) return null;

    return (
      <ul>
        {views.map((view, index) => {
          return (
            <li key={index} onClick={() => this.selectView(view)}>
              {view.name}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {

    return (
      <div>
        <h2>SQLITE Tables</h2>
        {this.renderTables()}
        <h2>SQLITE Views</h2>
        {this.renderViews()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  database: state.sqlite.database
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(databaseActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSidebar);
