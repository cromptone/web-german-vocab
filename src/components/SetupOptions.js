import React from 'react';
import Button from './Button';
import Subheading from './Subheading'
import PropTypes from 'prop-types';


export default class SetupOptions extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      chosenOptionId: ''
    }
  }

  handleClick(e) {
    this.setState({ chosenOptionId: e.target.id });
    this.props.onChoiceClicked(e);
  }

  render() {
    const optionButtonList = this.createButtonListFromOptions(this.props.options)

    return (
      <div>
        <Subheading prompt={this.props.optionPrompt} />
        {optionButtonList}
      </div>
    );
  }

  createButtonListFromOptions(options) {
    if (options.length < 1) { return }
    return options.map(option => {
      return (
        <Button
          chosen={Boolean(option.id === this.props.chosenId)}
          sizeClass='big'
          id={option.id}
          key={option.id}
          text={option.text}
          clickHandler={this.handleClick}
        />
      );
    });
  }
}

SetupOptions.propTypes = {
  chosenId: PropTypes.string,
  optionPrompt: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChoiceClicked: PropTypes.func.isRequired,
};