import React from 'react';
import ReactDOM from 'react-dom';
import { TweenLite, TimelineLite } from 'gsap';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  "use strict"
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Return not-chosen buttons to their previous state
    if (prevProps !== this.props && !this.props.chosen) {
      TweenLite.to(this.button, 0.75, {
        backgroundColor: '#a2a2a2',
      });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const button = e.currentTarget;
    this.props.clickHandler(e);

    // Make button wiggle and lighten
    const tl = new TimelineLite();
    tl.to(button, 0.1, { rotation: 2 })
    tl.to(button, 2, { rotation: 0, ease: Elastic.easeOut.config(0.9, 0.1) });
    var tl2 = new TimelineLite().to(button, 0.75, {
      backgroundColor: "#fafafa"
    });
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
    };

    if (this.props.sizeClass === 'big') {
      Object.assign(style, {
        fontSize: 30,
        height: 70,
      });
    }
    return (
      <button
        type="button"
        id={this.props.id}
        style={style}
        onClick={this.handleClick}
        ref={c => (this.button = c)}
      >
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  chosen: PropTypes.bool,
  sizeClass: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
};

