import React from "react";
import "../styles/FileUpload.css";

function FileUpload(props: any) {
  return (
    <React.Fragment>
      <input
        className="file-upload"
        type="file"
        name={props.name}
        onChange={props.onChange}
      />
    </React.Fragment>
  );
}

export default FileUpload;
