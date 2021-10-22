import React from "react";

function Card(props: any) {
  const className = props.className ? `card ${props.className}` : "card";
  return (
    <React.Fragment>
      <div
        className={className}
        id={props.id}
        onClick={props.onClick}
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: "#2C2C33",
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default Card;
