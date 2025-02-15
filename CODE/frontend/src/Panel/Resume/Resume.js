import React from 'react';
import "./Resume.css"
const resume = require('./image.png');

export default function Resume() {
  return (
    <div className="resume-container">
      <h2 className="resume-title">My Resume</h2>
      <div className="resume-buttons">
        <a href={resume} download="MyResume.png">
          <button className="resume-button">Download</button>
        </a>
        <a href={resume} target="_blank" rel="noopener noreferrer">
          <button className="resume-button">View</button>
        </a>
      </div>
    </div>
  );
}
