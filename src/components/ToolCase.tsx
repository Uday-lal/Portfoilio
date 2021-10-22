import React from "react";
import Card from "./Card";
import Progress from "./Progress";
import { useState } from "react";
import ToolsPopup from "./popups/ToolsPopup";
import "../styles/ToolCase.css";

interface ToolSectionProps {
  toolTitle: string;
  auth_token: string | null | undefined;
  progress: string;
  id: string;
  logo: string;
  isAdmin: boolean;
}

function ToolCase(props: ToolSectionProps) {
  const [popupDisplay, setPopupDisplay] = useState("none");

  return (
    <React.Fragment>
      <ToolsPopup
        isUpdate={true}
        toolName={props.toolTitle}
        auth_token={props.auth_token}
        progress={props.progress}
        id={props.id}
        display={popupDisplay}
        onClose={() => setPopupDisplay("none")}
      />
      <Card
        className="tool-case"
        onClick={() => {
          if (props.isAdmin) {
            setPopupDisplay("flex");
          }
        }}
      >
        <img src={props.logo} alt="tool-img" className="tool-img" />
        <h3 className="tool-title">{props.toolTitle}</h3>
        <Progress progress={props.progress + "%"} />
        <span className="percent">{props.progress + "%"}</span>
      </Card>
    </React.Fragment>
  );
}

export default ToolCase;
