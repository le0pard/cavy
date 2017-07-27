import React from 'react';
import {connect} from 'react-redux';
import SqliteServerConnect from './sqlite';

class ServerConnect extends React.Component {
  render() {
    return (
      <div>
        <SqliteServerConnect />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerConnect);
