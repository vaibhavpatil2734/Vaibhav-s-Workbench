import React, { useRef } from "react";
import Navbar from "./Navbar/Navbar";
import Terminal from "./Terminal/Terminal";
import InfoPanel from "./Panel/Panel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  // Create refs for each section in InfoPanel
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const projectsRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);

  // Function to scroll to a specific section
  const scrollToSection = (section) => {
    switch (section) {
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "gallery":
        galleryRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "projects":
        projectsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "resume":
        resumeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "contact":
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="app">
      <Navbar onScrollToSection={scrollToSection} />
      <div className="terminal">
        <Terminal />
      </div>
      <div className="panel">
        <InfoPanel
          homeRef={homeRef}
          galleryRef={galleryRef}
          projectsRef={projectsRef}
          resumeRef={resumeRef}
          contactRef={contactRef}
        />
      </div>
    </div>
  );
};

export default App;
