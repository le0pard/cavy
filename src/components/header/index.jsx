import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header id="header" className="page-topbar">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Logo</a>
              <ul className="right hide-on-med-and-down">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">JavaScript</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
