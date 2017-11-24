import React from 'react';
import PropTypes from 'prop-types';

export default function Subheading(props) {
  return (<h1 style={{ color: '#a2a2a2' }}>{props.prompt}
          </h1>);
}

Subheading.propTypes = {
  prompt: PropTypes.string,
};

Subheading.defaultProps = {
  prompt: '',
};
