import React, { useEffect, useRef } from "react";
import "react-image-lightbox/style.css";
import "./Panel.css";
import "../Terminal/Termianl.css";
import Home from "./Home/Home";
import Gallery from "./Gallery/Gallery";
import Projects from "./Projects/Projects";
import Resume from "./Resume/Resume";
import Contact from "./Contact/Contact";

const InfoPanel = ({ activeSection }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 26;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, x) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, x * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[x] = 0;
        }
        drops[x]++;
      });
    };

    const interval = setInterval(drawMatrix, 50);
    window.addEventListener("resize", setCanvasDimensions);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <div className="info-panel">
      <canvas ref={canvasRef} className="matrix-background matrixCanvas"></canvas>
      <div className="body">
        {activeSection === "home" && <Home />}
        {activeSection === "gallery" && <Gallery />}
        {activeSection === "projects" && <Projects />}
        {activeSection === "resume" && <Resume />}
        {activeSection === "contact" && <Contact />}
      </div>
    </div>
  );
};

export default InfoPanel;
