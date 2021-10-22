import React from "react";
import "../styles/Progress.css";

function Progress(props: any) {
  return (
    <React.Fragment>
      <div className="progress">
        <div className="progress-bar" style={{ width: props.progress }}></div>
      </div>
    </React.Fragment>
  );
}

export default Progress;
