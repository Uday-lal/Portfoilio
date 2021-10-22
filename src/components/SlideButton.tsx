import React from "react";
import "../styles/SlideButton.css";
import "../styles/Button.css";

function SlideButton(props: any) {
  const className = props.className
    ? `slide-button ${props.className}`
    : "slide-button";
  return (
    <React.Fragment>
      <button
        onClick={props.onClick}
        type={props.type}
        id={props.id}
        className={className}
        style={props.style}
      >
        {props.children}
      </button>
    </React.Fragment>
  );
}

export default SlideButton;
