import React from 'react';

class LeftSidebar extends React.Component {
  render() {
    return (
      <aside id="left-sidebar-nav">
        <ul id="slide-out" className="side-nav fixed leftside-navigation ps-container ps-active-y">
          <li className="bold">
            <a href="index.html" className="waves-effect waves-cyan"><i className="mdi-action-dashboard"></i> Dashboard</a>
          </li>
          <li className="bold">
            <a href="app-email.html" className="waves-effect waves-cyan"><i className="mdi-communication-email"></i> Mailbox <span className="new badge">4</span></a>
          </li>
        </ul>
        <a href="#" data-activates="slide-out" className="sidebar-collapse btn-floating btn-medium waves-effect waves-light hide-on-large-only darken-2">
          <i className="mdi-navigation-menu"></i>
        </a>
      </aside>
    );
  }
}

export default LeftSidebar;
