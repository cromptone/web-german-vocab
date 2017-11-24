import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputSubmission = this.handleInputSubmission.bind(this);
  }

  handleInputSubmission(e) {
    e.preventDefault();
    const inputText = this.inputBar.value;
    this.props.onSubmit(inputText);
    this.inputBar.value = '';
  }

  render() {
    const style = {
      width: '70%',
      height: 55,
      padding: '20px',
      border: 'none',
      borderRadius: 9,
      display: 'block',
      margin: '10px auto 20px auto',
      backgroundColor: '#a2a2a2',
      color: '#121224',
      fontSize: 30,
    };

    return (
      <form onSubmit={this.handleInputSubmission}>
        <input
          style={style}
          type="text"
          autoFocus
          ref={c => (this.inputBar = c)}
        />
      </form>
    );
  }
}

Input.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
