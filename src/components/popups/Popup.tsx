import React from "react";
import Card from "../Card";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "../../styles/Popup.css";

function Popup(props: any) {
  return (
    <React.Fragment>
      <div
        id={props.id}
        className="popup"
        style={{ display: props.display, zIndex: props.zIndex }}
      >
        <Card
          id="popup-card"
          classNane={props.className}
          width={props.width}
          height={props.height}
        >
          <IconButton
            onClick={props.onClose}
            style={{
              color: "white",
              position: "absolute",
              top: "0",
              right: "0",
              padding: "10px",
            }}
          >
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
          <div className="popup-content">{props.children}</div>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Popup;
