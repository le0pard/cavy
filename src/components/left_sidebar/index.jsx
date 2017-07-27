import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';

import './index.sass';

const styleSheet = createStyleSheet('LeftSidebar', theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  [theme.breakpoints.up('lg')]: {
    drawer: {
      width: '250px',
    }
  }
}));

class LeftSidebar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const {classes} = this.props;
    return (
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.paper,
        }}
        open={true}
        docked={true}
        keepMounted={true}
        onRequestClose={() => null}
        onClick={() => null}
      >
      <div className={classes.nav}>
        <Toolbar className={classes.toolbar}>
          <List disablePadding={true}>
            <ListItem button={true}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
          </List>
          <Divider />
          <List disablePadding={true}>
            <ListItem button={true}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
          </List>
          </Toolbar>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styleSheet)(LeftSidebar);
