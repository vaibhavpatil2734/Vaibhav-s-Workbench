import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Terminal from "./Terminal/Terminal";
import InfoPanel from "./Panel/Panel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [activeSection, setActiveSection] = useState("home"); // Track active section

  return (
    <div className="app">
      <Navbar setActiveSection={setActiveSection} />
      <div className="terminal">
        <Terminal />
      </div>
      <div className="panel">
        <InfoPanel activeSection={activeSection} />
      </div>
    </div>
  );
};

export default App;
