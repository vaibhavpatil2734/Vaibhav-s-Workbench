import React from 'react';
import './Projects.css';

export default function Projects() {
  const projects = [
    { title: "Project 1", image: "./project1.jpg", link: "https://project1.com" },
    { title: "Project 2", image: "./project2.jpg", link: "https://project2.com" },
    { title: "Project 3", image: "./project3.jpg", link: "https://project3.com" },
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
