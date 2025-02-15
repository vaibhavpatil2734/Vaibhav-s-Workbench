import React from 'react';
import './Projects.css';

export default function Projects() {
  const projects = [
    { title: "project-management-tool", image: "./project11.png", link: "https://project-management-tool2734.netlify.app" },
    { title: "wellnessnest", image: "./project22.png", link: "https://wellnessnest.netlify.app/" },
    { title: "linkvault", image: "./project3.png", link: "https://linkvault1.netlify.app" },
    { title: "Project 4", image: "./project4.jpg", link: "https://project4.com" },
  ];

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Recent Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="project-box">
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-overlay">
              <h4 className="project-name">{project.title}</h4>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
