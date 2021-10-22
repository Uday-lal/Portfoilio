import React from "react";
import { useState } from "react";
import Popup from "./Popup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import MakeRequests from "../../MakeRequests";
import Input from "../Input";

interface SkillPopupProps {
  display: string;
  isUpdate: boolean;
  name?: string;
  id?: string;
  skill_id?: string;
  onClose: () => void;
}

function SkillPopup(props: SkillPopupProps) {
  const [skillName, setSkillName] = useState("");
  const flexDirection = props.isUpdate ? "column" : "row";
  const height = props.isUpdate ? "35%" : "30%";

  const handleChange = (e: any) => {
    setSkillName(e.target.value);
  };

  const reset = () => {
    const skillForm = document.getElementById("skill-form");
    if (skillForm) {
      const inputs: NodeList = skillForm.childNodes;
      const len = inputs.length;
      for (let i = 0; i < len; i++) {
        (inputs[i] as HTMLInputElement).value = "";
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (skillName !== "") {
      reset();
      const makeRequests = new MakeRequests();
      if (!props.isUpdate) {
        const skillData = {
          auth_token: localStorage.getItem("auth_token"),
          skill_name: skillName,
        };
        makeRequests.makeRequest("/skills", "POST", skillData, () =>
          window.location.reload()
        );
      } else {
        const updatedData = {
          auth_token: localStorage.getItem("auth_token"),
          skill_id: props.skill_id,
          updated_data: { skill_name: skillName },
        };
        makeRequests.makeRequest("/skills", "PUT", updatedData, () =>
          window.location.reload()
        );
      }
    }
  };

  const onDelete = () => {
    const data = {
      auth_token: localStorage.getItem("auth_token"),
      skill_id: props.skill_id,
    };
    const makeRequests = new MakeRequests();
    makeRequests.makeRequest("/skills", "DELETE", data, () =>
      window.location.reload()
    );
  };

  return (
    <React.Fragment>
      <Popup display={props.display} onClose={props.onClose} height={height}>
        <h2>Add Skills</h2>
        <form
          id="skill-form"
          onSubmit={handleSubmit}
          style={{
            flexDirection: flexDirection,
          }}
        >
          <Input
            placeholder={props.isUpdate ? props.name : "Skill name"}
            name="skill_name"
            onChange={handleChange}
            style={{ margin: "10px" }}
          />
          {!props.isUpdate ? (
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
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                margin: "20px",
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
          )}
        </form>
      </Popup>
    </React.Fragment>
  );
}

export default SkillPopup;
