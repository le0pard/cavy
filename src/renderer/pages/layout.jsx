import React from 'react'

const {PropTypes} = React

class Layout extends React.Component {
  static displayName = 'Layout';

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className='page'>
        {this.props.children}
      </div>
    )
  }
}

export default Layout
