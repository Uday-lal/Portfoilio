import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ToolSection from "../sections/ToolSection";
import SkillSection from "../sections/SkillSection";
import SlideButton from "../SlideButton";
import ToolsPopup from "../popups/ToolsPopup";
import SkillPopup from "../popups/SkillPopup";
import ProjectSection from "../sections/ProjectSection";
import "../../styles/AdminPage.css";

interface RouteParams {
  auth_token: string;
}

interface AdminData {
  Name: string;
  email: string;
  password: string;
  profile_img: string;
  role: { is_supreme: boolean };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AdminPage() {
  const params: RouteParams = useParams();
  const auth_token = params.auth_token;
  const [value, setValue] = useState(0);
  const [toolPopup, setToolPopup] = useState("none");
  const [skillPopupDisplay, setSkillPopupDisplay] = useState("none");
  const [tabs, setTabs] = useState([
    "Tools & Languages",
    "Skills",
    "Projects",
    "Profile Settings",
  ]);
  const [state, setState] = useState({});
  const [roleName, setRoleName] = useState("Secondary");

  const getAdminData = async () => {
    const responce = await fetch(
      `https://portfoil.herokuapp.com/api/admin/${auth_token}`
    );
    if (responce.ok) {
      responce.json().then((data: AdminData) => {
        setState(data);
        if (data.role.is_supreme) {
          setRoleName("Supreme");
          setTabs([
            "Tools & Languages",
            "Skills",
            "Manage Admins",
            "Projects",
            "Profile Settings",
          ]);
        }
      });
    }
  };

  useEffect(() => {
    fetch("https://portfoil.herokuapp.com/api/authenticate-token", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        auth_token: auth_token,
      }),
    }).then((result) => {
      result
        .json()
        .then((data: { auth_token: string; authenticated: boolean }) => {
          if (!data.authenticated) {
            localStorage.removeItem(data.auth_token);
            window.location.replace("/admin");
          } else {
            getAdminData();
          }
        });
    });
  }, [auth_token]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <ToolsPopup
        display={toolPopup}
        id="tool-popup"
        isUpdate={false}
        auth_token={auth_token}
        onClose={() => setToolPopup("none")}
      />
      <SkillPopup
        isUpdate={false}
        display={skillPopupDisplay}
        onClose={() => setSkillPopupDisplay("none")}
      />
      <main>
        <section className="profile-section">
          <div className="profile-img">
            <img src={(state as AdminData).profile_img} alt="profile-img" />
          </div>
          <div className="profile-info">
            <h1 id="admin-name">{(state as AdminData).Name}</h1>
            <span id="admin-role">{roleName}</span>
          </div>
        </section>
        <section className="tabs-section">
          <Box sx={{ width: "80vw" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} variant="scrollable">
                {tabs.map((tab) => (
                  <Tab
                    label={tab}
                    key={tab}
                    style={{ color: "white" }}
                    {...a11yProps(0)}
                  />
                ))}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="tool section-header">
                <h2>Tools & Languages</h2>
                <SlideButton
                  onClick={() => setToolPopup("flex")}
                  style={{
                    fontSize: "1rem",
                    height: "50px",
                  }}
                >
                  Add
                </SlideButton>
              </div>
              <ToolSection isAdmin={true} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="skill section-header">
                <h2>Skills & Ability</h2>
                <SlideButton
                  onClick={() => setSkillPopupDisplay("flex")}
                  style={{
                    fontSize: "1rem",
                    height: "50px",
                  }}
                >
                  Add
                </SlideButton>
              </div>
              <SkillSection isAdmin={true} isUpdate={false} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              Manage admin
            </TabPanel>
            <TabPanel value={value} index={3}>
              <section className="project-section">
                <ProjectSection isAdmin={true} />
              </section>
            </TabPanel>
            <TabPanel value={value} index={4}>
              Profile setting
            </TabPanel>
          </Box>
        </section>
      </main>
    </React.Fragment>
  );
}

export default AdminPage;
