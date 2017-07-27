import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as credentialsActions} from 'containers/credentials';
import Button from 'material-ui/Button';
import {remote} from 'electron';
import {SQLITE_TYPE} from 'shared/constants';

const {dialog} = remote;

class SqliteServerConnect extends React.Component {
  static propTypes = {
    sqlite: PropTypes.shape({
      folder: PropTypes.string
    }),
    actions: PropTypes.shape({
      selectSqliteFolder: PropTypes.func.isRequired,
      connectToServer: PropTypes.func.isRequired
    }).isRequired
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const {folder} = this.props.sqlite;
    if (folder) {
      this.props.actions.connectToServer(SQLITE_TYPE, {
        folder
      });
    }
  }

  handleSelectedFolder(result) {
    if (result && result.length) {
      this.props.actions.selectSqliteFolder(result[0]);
    }
  }

  handleOnSelectFolder() {
    const options = {
      properties: ['openDirectory', 'createDirectory'],
      filters: [
        {name: 'Sqlite Databases', extensions: ['sqlite3']},
        {name: 'All Files', extensions: ['*']}
      ]
    };
    dialog.showOpenDialog(
      remote.getCurrentWindow(),
      options,
      this.handleSelectedFolder.bind(this)
    );
  }

  render() {
    const {sqlite: {folder}} = this.props;

    return (
      <div>
        <h3>Sqlite3</h3>
        <form onSubmit={this.handleOnSubmit.bind(this)}>
          <a className="btn" onClick={this.handleOnSelectFolder.bind(this)}>Select directory</a>
          <p>{folder}</p>
          <Button raised={true} color="primary" type="submit">
            Connect
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sqlite: state.credentials.sqlite
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(credentialsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SqliteServerConnect);
