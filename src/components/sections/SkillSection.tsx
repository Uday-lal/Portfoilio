import React from "react";
import Grid from "../Grid";
import Card from "../Card";
import { useState, useEffect } from "react";
import SkillPopup from "../popups/SkillPopup";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { collection, getDocs } from "firebase/firestore";
import FirebaseAccess from "../../firebase/config";
import "../../styles/SkillSection.css";

interface SkillState {
  skill_name: string;
  id: string;
}

interface SkillSectionProps {
  isUpdate: boolean;
  isAdmin: boolean;
}

function SkillSection(props: SkillSectionProps) {
  let skillState: SkillState[];
  let setSkillState: any;
  [skillState, setSkillState] = useState([]);
  const [popupDisplay, setPopupDisplay] = useState("none");
  const [popupName, setPopupName] = useState("");
  const [skillId, setSkillId] = useState("");
  const [progressDisplay, setProgressDisplay] = useState("flex");
  const firebaseAccess = new FirebaseAccess();
  const db = firebaseAccess.getFirestoreDb();
  const skillsCollections = collection(db, "Skills");

  const getSkills = async function () {
    try {
      const skillsDataObj = await getDocs(skillsCollections);
      const skillsData = skillsDataObj.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProgressDisplay("none");
      setSkillState(skillsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSkills();
  }, [""]);

  return (
    <React.Fragment>
      {props.isAdmin && (
        <SkillPopup
          isUpdate={true}
          name={popupName}
          skill_id={skillId}
          display={popupDisplay}
          onClose={() => setPopupDisplay("none")}
        />
      )}
      <section id="skill-section">
        <Box sx={{ display: progressDisplay }}>
          <CircularProgress style={{ color: "white" }} />
        </Box>
        <Grid gap={"30px"} contentWidth={400}>
          {skillState.map((skill) => (
            <Card
              className="skill-card"
              id={skill.id}
              key={skillState.indexOf(skill)}
              onClick={() => {
                if (props.isAdmin) {
                  setPopupName(skill.skill_name);
                  setSkillId(skill.id);
                  setPopupDisplay("flex");
                }
              }}
            >
              {skill.skill_name}
            </Card>
          ))}
        </Grid>
      </section>
    </React.Fragment>
  );
}

export default SkillSection;
