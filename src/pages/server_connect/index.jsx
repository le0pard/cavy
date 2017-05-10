import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as credentialsActions} from 'containers/credentials';
import Sqlite3ServerConnect from './sqlite3';

class ServerConnect extends React.Component {

  render() {
    return (
      <div>
        <Sqlite3ServerConnect />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.credentials
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(credentialsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerConnect);
