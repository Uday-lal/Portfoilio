import React from "react";
import "../styles/RippleButton.css";
import "../styles/Button.css";

function RippleButton(props: any) {
  const className = props.className
    ? `ripple-btn ${props.className}`
    : "ripple-btn";

  const createRipple = (event: any) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const diameter = Math.max(
      (button as HTMLButtonElement).clientWidth,
      (button as HTMLButtonElement).clientHeight
    );
    const radius = diameter / 2;
    ripple.style.width = `${diameter}px`;
    ripple.style.height = `${diameter}px`;
    ripple.style.left = `${
      event.clientX - ((button as HTMLButtonElement).offsetLeft + radius)
    }px`;
    ripple.style.top = `${
      event.clientY - ((button as HTMLButtonElement).offsetTop + radius)
    }px`;
    const rippleClass = (button as HTMLButtonElement).getElementsByClassName(
      "ripple"
    )[0];
    if (rippleClass) {
      rippleClass.remove();
    }
    (button as HTMLButtonElement).appendChild(ripple);
  };

  const buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", createRipple);
  }

  return (
    <React.Fragment>
      <button className={className} onClick={props.onClick}>
        {props.children}
      </button>
    </React.Fragment>
  );
}

export default RippleButton;
