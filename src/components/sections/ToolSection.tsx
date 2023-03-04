import React from "react";
import { useState, useEffect } from "react";
import ToolCase from "../ToolCase";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Tool {
  id: string;
  img_url: string;
  percent: string;
  tool_name: string;
}

interface ToolSectionProps {
  isAdmin: boolean;
}

function ToolSection(props: ToolSectionProps) {
  let tools: Tool[];
  let setTools: any;
  [tools, setTools] = useState([]);
  const [progressDisplay, setProgressDisplay] = useState("flex");
  useEffect(() => {
    fetch("http://localhost:5000/api/tool").then((responce) => {
      responce.json().then((data: Tool[]) => {
        setProgressDisplay("none");
        setTools(data);
      });
    });
  }, tools);

  const authToken = localStorage.getItem("auth_token")
    ? localStorage.getItem("auth_token")
    : undefined;

  return (
    <React.Fragment>
      <section className="tool-section">
        <Box sx={{ display: progressDisplay }}>
          <CircularProgress style={{ color: "white" }} />
        </Box>
        {tools.map((tool) => (
          <ToolCase
            logo={tool.img_url}
            id={tool.id}
            auth_token={authToken}
            key={tools.indexOf(tool)}
            toolTitle={tool.tool_name}
            progress={tool.percent}
            isAdmin={props.isAdmin}
          />
        ))}
      </section>
    </React.Fragment>
  );
}

export default ToolSection;
