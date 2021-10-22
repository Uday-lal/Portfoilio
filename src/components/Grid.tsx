import React from "react";
import "../styles/Grid.css";

function Grid(props: any) {
  return (
    <React.Fragment>
      <div
        className="grid"
        style={{
          display: "grid",
          width: props.width,
          height: props.height,
          gridTemplateColumns: props.offsets,
          columnGap: props.gap,
          rowGap: props.gap,
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default Grid;
