import React from 'react';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';

import './index.sass';

class LeftSidebar extends React.Component {
  render() {
    return (
      <Drawer
        anchor="left"
        open={false}
        docked={true}
        keepMounted={true}
        onRequestClose={() => null}
        onClick={() => null}
      >
        <div>
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
        </div>
      </Drawer>
    );
  }
}

export default LeftSidebar;
