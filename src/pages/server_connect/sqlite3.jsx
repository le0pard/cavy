import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as serversActions} from 'containers/servers';
import {remote} from 'electron';

const win = remote.getCurrentWindow();
const {dialog} = remote;

class Sqlite3ServerConnect extends React.Component {
  handleOnSubmit(e) {
    e.preventDefault();
    console.log('submit');
  }

  handleOnSelect() {
    const options = {
      properties: ['openDirectory', 'createDirectory'],
      filters: [
        {name: 'Sqlite Databases', extensions: ['sqlite3']},
        {name: 'All Files', extensions: ['*']}
      ]
    };
    dialog.showOpenDialog(win, options, (result) => {
      console.log(result);
    });
  }

  render() {
    return (
      <div>
        <h3>Sqlite3</h3>
        <form onSubmit={this.handleOnSubmit.bind(this)}>
          <button className="btn" onClick={this.handleOnSelect.bind(this)}>Select directory</button>
          <input type="text" name="extension" />
          <button className="btn">Connect</button>
        </form>
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
)(Sqlite3ServerConnect);
