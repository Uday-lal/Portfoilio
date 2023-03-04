import React from "react";
import ProjectCase from "../ProjectCase";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import FirebaseAccess from "../../firebase/config";

interface ProjectSectionProps {
  isAdmin: boolean;
}

interface Languages {
  languageName: string;
  amount: number;
}

interface ProjectProps {
  projectName: string;
  primaryLanguage: string;
  discryption: string;
  isAdded: boolean;
  id: string;
  githubUrl: string;
  languages: Languages[];
}

function ProjectSection(props: ProjectSectionProps) {
  let projectState: ProjectProps[];
  let setProjectState: any;
  let ids: string[];
  let setIds: any;
  [ids, setIds] = useState([]);
  [projectState, setProjectState] = useState([]);
  const firebaseAccess = new FirebaseAccess();
  const db = firebaseAccess.getFirestoreDb();
  const toolsCollections = collection(db, "projects");

  const makeRequestFormGithub = () => {
    const url = "https://api.github.com/users/Uday-lal/repos";
    fetch(url).then((responce) => {
      if (responce.ok) {
        makeApiCall();
        responce.json().then((result: any[]) => {
          const projectStateData: ProjectProps[] = [];
          result.map((projectData) => {
            const languages = makeRequestsForLanguages(
              projectData.languages_url
            );
            const isAdded = ids.includes(projectData.node_id) ? true : false;
            projectStateData.push({
              projectName: projectData.name,
              primaryLanguage: projectData.language,
              discryption: projectData.description,
              id: projectData.node_id,
              isAdded: isAdded,
              languages: languages,
              githubUrl: projectData.html_url,
            });
          });
          setProjectState(projectStateData);
        });
      }
    });
  };

  const makeRequestsForLanguages = (languagesUrl: string): Languages[] => {
    const languages_: Languages[] = [];
    fetch(languagesUrl).then((responce) => {
      if (responce.ok) {
        responce.json().then((result) => {
          const keys = Object.keys(result);
          for (let i = 0; i < keys.length; i++) {
            const languageName = keys[i];
            const amount = result[languageName];
            languages_.push({ languageName: languageName, amount: amount });
          }
        });
      }
    });
    return languages_;
  };

  const makeApiCall = async () => {
    // fetch("https://portfoil.herokuapp.com/api/projects").then((responce) => {
    //   if (responce.ok) {
    //     responce.json().then((result) => {
    //       setIds(result.ids);
    //     });
    //   }
    // });
    try {
      const toolsDataObj = await getDocs(toolsCollections);
      const toolsData = toolsDataObj.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(toolsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.isAdmin) {
      makeRequestFormGithub();
    }
  }, [""]);

  return (
    <React.Fragment>
      {projectState.map((project) => (
        <ProjectCase
          projectName={project.projectName}
          isAdmin={props.isAdmin}
          id={project.id}
          key={projectState.indexOf(project)}
          primaryLanguage={project.primaryLanguage}
          languages={project.languages}
          isAdded={project.isAdded}
          githubUrl={project.githubUrl}
          discryption={project.discryption}
        />
      ))}
    </React.Fragment>
  );
}

export default ProjectSection;
