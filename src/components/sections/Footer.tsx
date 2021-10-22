import React from "react";
import "../../styles/Footer.css";

function Footer() {
  return (
    <React.Fragment>
      <footer>
        <div className="logo-text-section">
          <div className="social-logos">
            <a
              href="https://www.linkedin.com/in/uday-lal-03418621a/"
              target="_blank"
            >
              <img
                src="./assets/linkedin_logo.svg"
                alt="linkedin-logo"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
            <a href="https://github.com/Uday-lal" target="_blank">
              <img
                src="./assets/GitHub-Light64px.png"
                alt="github-logo"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
          </div>
          <span id="copyright-text">&#169; 2021 Uday lal</span>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
