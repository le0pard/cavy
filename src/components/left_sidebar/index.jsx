import React from 'react';
import SvgSprite from 'components/svg_sprite';

import './index.sass';

class LeftSidebar extends React.Component {
  render() {
    return (
      <div className="left-sidebar-nav">
        <ul className="left-sidebar-nav__list">
          <li>
            <a href="index.html">
              <i className="mdi-action-dashboard"></i> Tables
            </a>
          </li>
        </ul>
        <a className="left-sidebar-nav__menu btn-floating btn-medium hide-on-large-only">
          <SvgSprite name="navicon" className="left-sidebar-nav__menu-icon" />
        </a>
      </div>
    );
  }
}

export default LeftSidebar;
