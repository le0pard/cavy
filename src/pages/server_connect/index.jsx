import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as serversActions} from 'containers/servers';

class ServerConnect extends React.Component {
  render() {
    return (
      <h3>
        <a onClick={() => this.props.actions.serverConnect()}>Hello</a>
        <a className="btn">button</a>
      </h3>
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
