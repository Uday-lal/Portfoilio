import React from "react";
import { useState, useEffect } from "react";
import ToolCase from "../ToolCase";
import CircularProgress from "@mui/material/CircularProgress";
import { collection, getDocs } from "firebase/firestore";
import FirebaseAccess from "../../firebase/config";
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
  const firebaseAccess = new FirebaseAccess();
  const db = firebaseAccess.getFirestoreDb();
  const toolsCollections = collection(db, "tool");

  const getTools = async function () {
    try {
      const toolsDataObj = await getDocs(toolsCollections);
      const toolsData = toolsDataObj.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProgressDisplay("none");
      setTools(toolsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTools();
  }, tools);

  const authToken = localStorage.getItem("auth_token")
    ? localStorage.getItem("auth_token")
    : undefined;

  return (
    <React.Fragment>
      <section
        className="tool-section"
        style={{
          display: "flex",
          alignItems: "center",
          margin: "15px 0px",
          flexDirection: "column",
          justifyContent: "center",
          width: "90vw",
        }}
      >
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
