import React from "react";
import Popup from "./Popup";
import Input from "../Input";
import FileUpload from "../FileUpload";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import ProgressPopup from "./ProgressPopup";
import storageUpload from "../../storageUpload";
import Button from "@mui/material/Button";
import "../../styles/ToolsPopup.css";

function ToolsPopup(props: any) {
  const [state, setState] = useState({
    tool_name: "",
    percent: "",
    id: props.id,
    img_url: "",
    auth_token: props.auth_token,
  });
  const [popupDisplay, setPopupDisplay] = useState("none");
  const [progress, setProgress] = useState(0);
  const toolName = props.toolName;
  const percent = props.progress;

  const reset = () => {
    const toolForm = document.getElementById("tool-form");
    if (toolForm) {
      const inputs: NodeList = toolForm.childNodes;
      const len = inputs.length;
      for (let i = 0; i < len; i++) {
        (inputs[i] as HTMLInputElement).value = "";
      }
    }
  };

  const handleChanges = (e: any) => {
    if (e.target.name === "toolName") {
      const stateData = state;
      stateData.tool_name = e.target.value;
      setState(stateData);
    } else if (e.target.name === "percent") {
      const stateData = state;
      stateData.percent = e.target.value;
      setState(stateData);
    } else {
      const stateData = state;
      stateData.img_url = e.target.files[0];
      setState(stateData);
    }
  };

  const onProgress = (progress: number) => {
    setProgress(progress);
  };

  const onError = () => {
    // ...
  };

  const onDone = (fileStorageInfo: string) => {
    if (!props.isUpdate) {
      createTool(fileStorageInfo);
    } else {
      updateTool(fileStorageInfo);
    }
  };

  const createTool = (fileStorageInfo: string) => {
    const toolData = state;
    toolData.img_url = fileStorageInfo;
    makeRequests(
      "tool",
      "POST",
      () => {
        setPopupDisplay("none");
        window.location.reload();
      },
      toolData
    );
  };

  const updateTool = (fileStorageInfo?: string) => {
    const updateData: any = {
      auth_token: state.auth_token,
      tool_id: state.id,
      updated_data: [],
    };
    const stateKeys = Object.keys(state);
    if (fileStorageInfo) {
      updateData.updated_data.push({ img_url: fileStorageInfo });
    }
    for (let key of stateKeys) {
      if (key === "tool_name" || key === "percent") {
        if (state[key] !== "") {
          if (key === "tool_name")
            updateData.updated_data.push({ tool_name: state[key] });
          else updateData.updated_data.push({ percent: state[key] });
        }
      }
    }

    makeRequests(
      "tool",
      "PUT",
      () => {
        setPopupDisplay("none");
        window.location.reload();
      },
      updateData
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      !props.isUpdate &&
      state.tool_name !== "" &&
      state.percent !== "" &&
      state.img_url !== ""
    ) {
      const selectedFile = state.img_url;
      storageUpload(selectedFile, onDone, onProgress, onError);
      setPopupDisplay("flex");
      reset();
    } else {
      if (state.tool_name !== "" || state.percent !== "") {
        if (state.img_url !== "") {
          storageUpload(state.img_url, onDone, onProgress, onError);
          setPopupDisplay("flex");
          reset();
        } else updateTool();
      }
    }
  };

  const makeRequests = (
    endPoint: string,
    method: string,
    onOk: () => void,
    body: object
  ) => {
    fetch(`https://portfoil.herokuapp.com/api/${endPoint}`, {
      method: method,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(body),
    }).then((result) => {
      if (result.ok) {
        onOk();
      }
    });
  };

  const onDelete = () => {
    const toolData = { auth_token: state.auth_token, tool_id: state.id };
    makeRequests("tool", "DELETE", () => window.location.reload(), toolData);
  };

  return (
    <React.Fragment>
      <ProgressPopup display={popupDisplay} progress={progress} />
      <Popup id={props.id} display={props.display} onClose={props.onClose}>
        {props.isUpdate ? <h2>Tool Settings</h2> : <h2>Add Tools</h2>}
        <form onSubmit={handleSubmit} id="tool-form">
          <Input
            placeholder={props.isUpdate ? toolName : "Tool or language name"}
            name="toolName"
            onChange={handleChanges}
            style={{ margin: "10px" }}
          />
          <Input
            placeholder={props.isUpdate ? percent : "Progress Amount"}
            name="percent"
            onChange={handleChanges}
            style={{ margin: "10px" }}
          />
          <FileUpload name="imgUrl" onChange={handleChanges} />
          {props.isUpdate ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                padding: "0px 20px",
              }}
            >
              <Button
                variant="contained"
                size="large"
                type="submit"
                style={{
                  backgroundColor: "#4d4d4d",
                  width: "20vh",
                  borderRadius: "50px",
                }}
              >
                <UpdateIcon />
                Update
              </Button>
              <Button
                color="error"
                onClick={onDelete}
                style={{
                  width: "20vh",
                  borderRadius: "50px",
                  fontSize: "bold",
                }}
              >
                <DeleteIcon />
                Delete
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              size="large"
              type="submit"
              style={{
                backgroundColor: "#4d4d4d",
                width: "20vh",
                borderRadius: "50px",
              }}
            >
              <AddIcon />
              Add
            </Button>
          )}
        </form>
      </Popup>
    </React.Fragment>
  );
}

export default ToolsPopup;
