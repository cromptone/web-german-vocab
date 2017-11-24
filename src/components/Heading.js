import React from 'react';

export default function Heading(props) {
  const style = {
    color: "#a2a2a2",
    fontSize: 50,
    fontFamily: "sans-serif",
    clear: "both",
    textAlign: "center",
    height: 100,
    opacity: .8,
    margin: "0 auto"
  }

  return <div style={style}>{props.text}</div>
}