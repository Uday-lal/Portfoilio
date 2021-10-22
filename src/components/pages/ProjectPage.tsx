import React from "react";
import { Component } from "react";
import ProjectCase from "../ProjectCase";
import Footer from "../sections/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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

  componentDidMount() {
    fetch("https://portfoil.herokuapp.com/api/projects").then((responce) => {
      if (responce.ok) {
        responce.json().then((result) => {
          this.setState({ projects: result.results, progressDisplay: "none" });
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <nav id="project-page-nav" style={{ justifyContent: "space-between" }}>
          <a href="/" id="Nav-header">
            Uday Lal
          </a>
          <a href="#" style={{ margin: "25px" }}>
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
