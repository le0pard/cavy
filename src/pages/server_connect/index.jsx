import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as serversActions} from 'containers/servers';
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
  servers: state.servers
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(serversActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerConnect);
