import React from 'react';
import ReactDOM from 'react-dom';
import { TweenLite, TimelineLite } from 'gsap';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.chosen !== this.props.chosen)
  }

  componentDidUpdate(prevProps) {
    // Return not-chosen buttons to their previous state
    if ((prevProps !== this.props) && !this.props.chosen) {
      TweenLite.to(this.button, 0.75, { backgroundColor: '#a2a2a2' });
    }
  } 

  handleClick(e) {
    this.animateClickedButton(e.currentTarget);
    this.props.clickHandler(e);
  }

  render() {
    const style = {
      borderRadius: 9,
      borderStyle: 'none',
      margin: 0,
      marginLeft: 10,
      marginBottom: 10,
      backgroundColor: '#a2a2a2',
      color: '#121224',
      fontSize: 16,
      boxShadow: "3px 3px 2px #525252"
    };

    if (this.props.sizeClass === 'big') {
      Object.assign(style, {
        fontSize: 20,
        height: 40,
      });
    }
    return (
      <button
        type="button"
        id={this.props.id}
        style={style}
        onClick={this.handleClick}
        ref={c => (this.button = c)}
        autoFocus={this.props.focus}
      >
        {this.props.text}
      </button>
    );
  }

  animateClickedButton(button) {
    const wiggleAnimation = new TimelineLite();
    wiggleAnimation.to(button, 0.1, { rotation: 2 })
    wiggleAnimation.to(button, 2, { rotation: 0, ease: Elastic.easeOut.config(0.9, 0.1) });
    var colorChangeAnimation = new TimelineLite().to(button, 0.75, {
      backgroundColor: "#fafafa",
    });
    if (this.props.autoRevertColorChange) {
      colorChangeAnimation.reverse(0);
    }
  }

}

Button.propTypes = {
  chosen: PropTypes.bool,
  sizeClass: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  autofocus: PropTypes.bool,
  autoRevertColorChange: PropTypes.bool
};

Button.defaultProps = {
  focus: false,
  autoRevertColorChange: false
};
