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
      </div>
    );
  }
}

export default LeftSidebar;
