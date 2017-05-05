import React from 'react';
import PropTypes from 'prop-types';

class SvgSprite extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  render() {
    const {name, className} = this.props;

    return (
      <svg className={className}>
        <use xlinkHref={`#${name}-icon`} />
      </svg>
    );
  }
}

export default SvgSprite;
