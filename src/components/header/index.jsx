import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as credentialsActions} from 'containers/sqlite/credentials';

import './index.sass';

const styleSheet = createStyleSheet('Header', theme => ({
  appBar: {
    transition: theme.transitions.create('width'),
  },
  [theme.breakpoints.up('lg')]: {
    appBarShift: {
      width: 'calc(100% - 250px)',
    }
  }
}));

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
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
    const {classes, credentials: {databases}} = this.props;

    return (
      <header>
        <AppBar className={`${classes.appBar} ${classes.appBarShift}`}>
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              {databases && this.renderDatabaseSelector(databases)}
            </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
        </AppBar>
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

export default withStyles(styleSheet)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));
