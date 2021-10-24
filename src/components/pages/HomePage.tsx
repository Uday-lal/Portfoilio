import React from "react";
import { useState } from "react";
import "../../styles/HomePage.css";
import SlideButton from "../SlideButton";
import ToolSection from "../sections/ToolSection";
import SkillSection from "../sections/SkillSection";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";

function HomePage() {
  const [midBarDisplay, setMidBarDisplay] = useState("block");
  const [barMargin, setBarMargin] = useState("2.5px");
  const [topBarState, setTopBarState] = useState(0);
  const [bottomBarState, setBottomBarState] = useState(0);
  const [navPopupDisplay, setNavPopupDisplay] = useState("none");
  const [navPop, setNavPopup] = useState(0);

  const onPopupOpen = () => {
    setMidBarDisplay("none");
    setBarMargin("0");
    setTopBarState(-135);
    setNavPopup(10);
    setBottomBarState(135);
    setNavPopupDisplay("flex");
  };

  const onPopupClose = () => {
    setMidBarDisplay("block");
    setBarMargin("2.5px");
    setTopBarState(0);
    setBottomBarState(0);
    setNavPopupDisplay("none");
  };

  return (
    <React.Fragment>
      <div id="home-page" style={{ overflow: "hidden" }}>
        <nav id="home-page-nav">
          <a href="/" id="Nav-header">
            Uday Lal
          </a>
          <ul className="nav-links" id="home-page-links">
            <li className="link">
              <a href="#skills">Skills</a>
            </li>
            <li className="link" id="contact-link">
              <a href="#contact">Contact</a>
            </li>
            <li className="link">
              <a
                href="https://drive.google.com/file/d/10rFxb6zKTm2ABvmg3uJV66TsagVGvE4X/view?usp=sharing"
                target="_blank"
              >
                Resume
              </a>
            </li>
          </ul>
          <div
            id="hamburger"
            onClick={() => {
              if (topBarState === 0 && midBarDisplay === "block") {
                onPopupOpen();
              } else {
                onPopupClose();
              }
            }}
          >
            <motion.span
              animate={{ rotate: topBarState, margin: barMargin }}
              className="bar"
            ></motion.span>

            <motion.span
              animate={{ display: midBarDisplay, margin: barMargin }}
              className="bar"
            ></motion.span>
            <motion.span
              animate={{ rotate: bottomBarState, margin: barMargin }}
              className="bar"
            ></motion.span>
          </div>
        </nav>
        <motion.div
          initial={{ y: 2500 }}
          animate={{ y: navPop }}
          style={{ display: "relative" }}
        >
          <div
            id="nav-popup"
            style={{
              display: navPopupDisplay,
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              position: "absolute",
              width: "95vw",
              height: "25vh",
              backdropFilter: "blur(5px)",
            }}
          >
            <a
              href="#skills"
              onClick={() => onPopupClose()}
              className="popup-nav-link"
              style={{ zIndex: 2 }}
            >
              Skills
            </a>
            <a
              href="https://drive.google.com/file/d/10rFxb6zKTm2ABvmg3uJV66TsagVGvE4X/view?usp=sharing"
              target="_blank"
              onClick={() => onPopupClose()}
              className="popup-nav-link"
              style={{ zIndex: 2 }}
            >
              Resume
            </a>
          </div>
        </motion.div>
        <main style={{ overflow: "hidden" }}>
          <section className="Hero-Section">
            <div className="left-side-content">
              <h1>
                I build and design the backend and frontend of web, mobile and desktop
                applications.
              </h1>
              <SlideButton onClick={() => window.location.replace("projects")}>
                View Projects
              </SlideButton>
            </div>
            <div className="right-side-content">
              <img src="./assets/hero.svg" alt="hero-img" />
            </div>
          </section>
          <section className="showcase-sections">
            <h2>Tools & Languages</h2>
            <ToolSection isAdmin={false} />
          </section>
          <section className="showcase-sections" id="skills">
            <h2>Skills & Ability</h2>
            <SkillSection isAdmin={false} isUpdate={false} />
          </section>
          <section className="showcase-sections" id="contact">
            <h2>Contact</h2>
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
