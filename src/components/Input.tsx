import React from "react";
import "../styles/Input.css";

function Input(props: any) {
  return (
    <React.Fragment>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        style={props.style}
      />
    </React.Fragment>
  );
}

export default Input;
