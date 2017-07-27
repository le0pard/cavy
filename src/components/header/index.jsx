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
      databases: PropTypes.arrayOf(PropTypes.string)
    })
  }

  renderDatabaseSelector(databases) {
    const selectorDatabases = databases.map((database) => {
      return {
        label: database,
        value: database
      };
    });

    return (
      <Select name="database" options={selectorDatabases} />
    );
  }

  render() {
    const {credentials: {databases}} = this.props;

    return (
      <header className="header">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <ul>
                <li>
                  {databases && this.renderDatabaseSelector(databases)}
                </li>
              </ul>
            </div>
          </nav>
        </div>
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
