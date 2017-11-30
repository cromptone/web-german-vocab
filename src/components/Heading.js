import React from 'react';

export default function Heading(props) {
    const style = {
        color: "#121224",
        backgroundColor: "#888888",
        fontSize: 15,
        fontFamily: "sans-serif",
        display: "flex",
        height: 15,
        margin: "0 auto 0 auto",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        boxShadow: "0px 3px 9px #000000",
        bottomMargin: 80,
        padding: "5px 10px",
        zIndex: 10
    };

    return <div style={style}><em>{props.text}</em></div>;
};