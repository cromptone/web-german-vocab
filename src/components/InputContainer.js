import React from 'react';
import Subheading from './Subheading';
import PropTypes from 'prop-types';
import Input from './Input';


export default function InputContainer(props) {

  return (
  <div>
    <div style={{ marginLeft: '12.5%' }} >
	  <Subheading prompt={props.prompt} />
	</div>
	{props.showInputBar &&
	  <Input onSubmit={props.handleVocabSubmission} />
	}
  </div>);
}

InputContainer.propTypes= {
  showInputBar: PropTypes.bool,
  handleVocabSubmission: PropTypes.func,
  prompt: PropTypes.string
}

