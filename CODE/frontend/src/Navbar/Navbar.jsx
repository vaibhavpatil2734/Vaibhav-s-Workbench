import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = (setactiveSection) => {
  // Function to handle smooth scrolling to a section
  const onScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth", // Smooth scroll
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#home" onClick={() => onScrollToSection("home")}>Vaibhav's Terminal</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home" >Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#gallery" >Gallery</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects" >Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#resume" >Resume</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" >Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
