import React from "react";
import { Component } from "react";
import ProjectCase from "../ProjectCase";
import Footer from "../sections/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { collection, getDocs } from "firebase/firestore";
import FirebaseAccess from "../../firebase/config";
import "../../styles/ProjectPage.css";

interface Languages {
  languageName: string;
  amount: number;
}

interface ProjectCaseProps {
  project_name: string;
  primary_language: string;
  languages: Languages[];
  live_link: string;
  discryption: string;
  github_url: string;
  id: string;
}

class ProjectPage extends Component {
  state: { projects: ProjectCaseProps[]; progressDisplay: string } = {
    projects: [],
    progressDisplay: "flex",
  };

  async getProjects() {
    const firebaseAccess = new FirebaseAccess();
    const db = firebaseAccess.getFirestoreDb();
    const toolsCollections = collection(db, "projects");
    try {
      const toolsDataObj = await getDocs(toolsCollections);
      const toolsData = toolsDataObj.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(toolsData);
      this.setState({ projects: toolsData, progressDisplay: "none" });
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.getProjects();
  }

  render() {
    return (
      <React.Fragment>
        <nav id="project-page-nav" style={{ justifyContent: "space-between" }}>
          <a href="/" id="Nav-header">
            Uday Lal
          </a>
          <a
            href="/assets/resume.pdf"
            target="_blank"
            style={{ margin: "25px" }}
          >
            Resume
          </a>
        </nav>
        <main>
          <section className="project-page-img">
            <img src="./assets/Project_section.svg" alt="launch-img" />
          </section>
          <section className="project-page-projects">
            <h1>My Projects</h1>
            <div id="projects">
              <Box sx={{ display: this.state.progressDisplay }}>
                <CircularProgress style={{ color: "white" }} />
              </Box>
              {this.state.projects.map((project) => (
                <ProjectCase
                  projectName={project.project_name}
                  primaryLanguage={project.primary_language}
                  languages={project.languages}
                  liveLink={project.live_link}
                  isAdmin={false}
                  id={project.id}
                  discryption={project.discryption}
                  githubUrl={project.github_url}
                />
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ProjectPage;
