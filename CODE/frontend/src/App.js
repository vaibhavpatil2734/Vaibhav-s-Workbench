import React, { useRef } from "react";
import Navbar from "./Navbar/Navbar";
import Terminal from "./Terminal/Terminal";
import InfoPanel from "./Panel/Panel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {




  return (
    <div className="app">
      <Navbar />
      <div className="terminal">
        <Terminal />
      </div>
      <div className="panel">
        <InfoPanel
        />
      </div>
    </div>
  );
};

export default App;
