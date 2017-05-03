import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as dbCredentialsActions} from 'containers/db_credentials';

class Login extends React.Component {

  render() {
    return (
      <h3>
        <a onClick={() => this.props.actions.dbCredentialsConnect()}>Hello</a>
        <a className="waves-effect waves-light btn">button</a>
      </h3>
    );
  }
}

const mapStateToProps = (state) => ({
  dbCredentials: state.dbCredentials,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dbCredentialsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
