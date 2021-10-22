import React from "react";
import { useState } from "react";
import Card from "./Card";
import VerifiedIcon from "@mui/icons-material/Verified";
import LanguageProgress from "./LanuageProgress";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "./popups/Popup";
import Input from "./Input";
import MakeRequests from "../MakeRequests";
import LaunchIcon from "@mui/icons-material/Launch";
import "../styles/ProjectCase.css";

interface Languages {
  languageName: string;
  amount: number;
}

interface ProjectCaseProps {
  projectName: string;
  primaryLanguage: string;
  languages: Languages[];
  isAdmin: boolean;
  liveLink?: string;
  isAdded?: boolean;
  discryption: string;
  githubUrl: string;
  id: string;
}

function ProjectCase(props: ProjectCaseProps) {
  const [popupDisplay, setPopupDisplay] = useState("none");
  const [liveUrl, setLiveUrl] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (liveUrl !== "") {
      reset();
      const makeRequests = new MakeRequests();
      const projectData = {
        auth_token: localStorage.getItem("auth_token"),
        live_link: liveUrl,
        project_name: props.projectName,
        discryption: props.discryption,
        languages: props.languages,
        github_url: props.githubUrl,
        primary_language: props.primaryLanguage,
        id: props.id,
      };
      makeRequests.makeRequest("/projects", "POST", projectData, () =>
        window.location.reload()
      );
    }
  };

  const reset = () => {
    const projectForm = document.getElementById("project-form");
    if (projectForm) {
      const inputs: NodeList = projectForm.childNodes;
      const len = inputs.length;
      for (let i = 0; i < len; i++) {
        (inputs[i] as HTMLInputElement).value = "";
      }
    }
  };

  const remove = () => {
    const makeRequests = new MakeRequests();
    const deleteData = {
      auth_token: localStorage.getItem("auth_token"),
      id: props.id,
    };
    makeRequests.makeRequest("/projects", "DELETE", deleteData, () =>
      window.location.reload()
    );
  };

  console.log(props);

  return (
    <React.Fragment>
      <Popup
        display={popupDisplay}
        onClose={() => setPopupDisplay("none")}
        height="30%"
      >
        <div className="popup-content-projects">
          <h2>Add Project</h2>
          <form
            id="project-form"
            style={{ flexDirection: "row" }}
            onSubmit={onSubmit}
          >
            <Input
              placeholder="Live Url"
              onChange={(e: any) => setLiveUrl(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#4d4d4d", borderRadius: "50px" }}
            >
              <AddIcon />
              Add
            </Button>
          </form>
        </div>
      </Popup>
      <Card className="project-case">
        <div className="project-case-header">
          <h2>{props.projectName}</h2>
          {props.isAdmin && props.isAdded && (
            <VerifiedIcon
              fontSize="large"
              style={{
                position: "absolute",
                top: "0",
                right: "1",
                margin: "10px",
              }}
            />
          )}
          <p>{props.discryption}</p>
          <div className="middle-section" style={{ display: "flex" }}>
            <div
              className="lang"
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <span
                className={`primary-language ${props.primaryLanguage}`}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              ></span>
              <span>{props.primaryLanguage}</span>
            </div>
            <div className="buttons">
              {props.isAdmin &&
                (!props.isAdded ? (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#121212", borderRadius: "50px" }}
                    onClick={() => setPopupDisplay("flex")}
                  >
                    <AddIcon />
                    Add
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ borderRadius: "50px" }}
                    onClick={() => remove()}
                  >
                    <DeleteIcon />
                    Remove
                  </Button>
                ))}

              {!props.isAdmin && (
                <React.Fragment>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#191919", margin: "0px 10px" }}
                    href={props.githubUrl}
                    target="_blank"
                    className="client-side-project-button"
                  >
                    <img
                      style={{
                        width: "25px",
                        height: "25px",
                        margin: "0px 5px",
                      }}
                      src="./assets/Github-Light-32px.png"
                      alt="github-logo"
                    />
                    View Github
                  </Button>
                  <a href={props.liveLink} target="_blank" id="custom-a">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#000000" }}
                      className="client-side-project-button"
                    >
                      <LaunchIcon style={{ margin: "0px 5px" }} />
                      View Demo
                    </Button>
                  </a>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <LanguageProgress languages={props.languages} />
      </Card>
    </React.Fragment>
  );
}

export default ProjectCase;
