import React from "react";

function Container(props: any) {
  return (
    <React.Fragment>
      <div className="container" style={{ margin: "25px" }}>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default Container;
