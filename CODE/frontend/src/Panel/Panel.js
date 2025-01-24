import React, { useEffect, useState, useRef } from "react";
import ReactImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./Panel.css";
import "../Terminal/Termianl.css";
import resume from "./image.png";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTwitter, faDev, faStackOverflow} from '@fortawesome/free-brands-svg-icons'

const InfoPanel = () => {
  const roles = [
    "Open Source Contributor",
    "MERN Developer",
    "Cybersecurity Enthusiast",
    "Social Worker",
    "Tech Blogger",
    "AI/ML Enthusiast",
  ];

  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const images = [
    "https://imgs.search.brave.com/bT9XBpvB4E7X2hwgEoBO67lmULlMM6Z4z65MO17Lx7c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTEucG9wc3VnYXIt/YXNzZXRzLmNvbS9m/aWxlcy90aHVtYm9y/Lzl3MTdHVzRwR0tr/ajJGZmdjbGVpMEFR/V05EOD0vZml0LWlu/Lzc5Mng1MjgvdG9w/L2ZpbHRlcnM6Zm9y/bWF0X2F1dG8oKTp1/cHNjYWxlKCkvMjAy/MC8wNi8yNS8wMzAv/bi8xOTIyMjgzL2Rj/OTEwZTc2OGUzNmE0/MWVfREFSS18xMDVf/VW5pdF8wMjI4NVIu/anBn",
    "https://imgs.search.brave.com/4fizkDMUrNnJsYCuiW00XZqt1Fi9AhKAVlvYV8Mn8pY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9lMC5w/eHhmdWVsLmNvbS93/YWxscGFwZXJzLzg5/My80NzMvZGVza3Rv/cC13YWxscGFwZXIt/ZGFyay1tYXJ0aGEt/bmllbHNlbi10aHVi/bmFpbC5qcGc",
    "https://imgs.search.brave.com/vht5PK-IgpL8ygqQf02LeN1HgP2DTAByzR1O_YnDcZM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9lMS5w/eHhmdWVsLmNvbS9k/ZXNrdG9wLXdhbGxw/YXBlci82NzUvNzE3/L2Rlc2t0b3Atd2Fs/bHBhcGVyLWRhcmst/dHYtc2hvdy1jaGFy/YWN0ZXItbGlzdC1k/YXJrLW5ldGZsaXgt/dGh1bWJuYWlsLmpwZw",
    // Add more image URLs as needed
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const canvasRef = useRef(null);

  // Contact Form State
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState(null); // null | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 150; // Typing and deleting speed
    const pauseTime = 2000; // Pause before switching roles

    const handleTyping = () => {
      const role = roles[roleIndex];

      if (isDeleting) {
        setCurrentRole(role.substring(0, charIndex - 1)); // Delete character
        setCharIndex(charIndex - 1);
      } else {
        setCurrentRole(role.substring(0, charIndex + 1)); // Add character
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === role.length) {
        setTimeout(() => setIsDeleting(true), pauseTime); // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length); // Move to the next role
      }
    };

    const typingInterval = setInterval(handleTyping, typingSpeed);

    return () => clearInterval(typingInterval); // Cleanup interval
  }, [charIndex, isDeleting, roles, roleIndex]);

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
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = Array(Math.floor(columns)).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ff0000"; // Red text
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

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  // Contact Form Handlers
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await axios.post("http://localhost:5000/contact", {
        email,
        message,
      });
      if (response.status === 201) {
        setFormStatus("success");
        setEmail("");
        setMessage("");
        setErrorMessage("");
      }
    } catch (error) {
      setFormStatus("error");
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      console.error("Error submitting form:", error);
    }
  };

  const renderFormStatus = () => {
    if (formStatus === "loading") {
      return <p className="status-message">Submitting...</p>;
    } else if (formStatus === "success") {
      return (
        <p className="success-message">
          <h6>Thank you! We've received your message.</h6>
        </p>
      );
    } else if (formStatus === "error") {
      return (
        <>
          <p className="error-message"> <h6>Error: {errorMessage}</h6></p>
        </>
      );
    }
    return null;
  };

  return (
    <div className="info-panel">
      <canvas id="matrixCanvas" ref={canvasRef}></canvas>
      <div className="body scrollbar" id="scrollbar1">
        <div className="b1">
          <div className="content">
            <h1>
              Hello There! <span className="wave">👋</span>
            </h1>
            <h2>I'M VAIBHAV PATIL</h2>
            <p>{currentRole}</p>
          </div>
        </div>
        <div className="b">
          <div className="gallery-box">
            <h1 className="gallery-title">My Gallery</h1>
            <div className="gallery-image-container" onClick={openLightbox}>
              <img
                src={images[currentImage]}
                alt={`Image ${currentImage + 1}`}
                className="gallery-image"
              />
            </div>
            {isLightboxOpen && (
              <ReactImageLightbox
                mainSrc={images[currentImage]}
                nextSrc={images[(currentImage + 1) % images.length]}
                prevSrc={
                  images[(currentImage - 1 + images.length) % images.length]
                }
                onCloseRequest={closeLightbox}
                onMovePrevRequest={() =>
                  setCurrentImage(
                    (currentImage - 1 + images.length) % images.length
                  )
                }
                onMoveNextRequest={() =>
                  setCurrentImage((currentImage + 1) % images.length)
                }
              />
            )}
          </div>
        </div>
        <div className="b">
          <div className="project-box">
            <h6 className="project-title">My Recent Projects</h6>
            <div className="row project-grid">
              <div className="col-md-6 project-item">Project 1</div>
              <div className="col-md-6 project-item">Project 2</div>
              <div className="col-md-6 project-item">Project 3</div>
              <div className="col-md-6 project-item">Project 4</div>
            </div>
          </div>
        </div>
        <div className="b">
          <div className="resume-box">
            <h2 className="project-title">My Resume</h2>
            <br />
            <div>
              <a href={resume} download="MyResume.png">
                <img
                  src={resume}
                  style={{ width: "30%", height: "40%", cursor: "pointer" }}
                  alt="Download My Resume"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="b">
          <div className="form-container">
            <h1 className="project-title">Contact Us</h1>
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Send Message</button>
              {renderFormStatus()}
            </form>
          </div>
        </div>
        <footer className="site-footer">
            <div className="footer-content">
                <div className="social-icons">
                    <a href="https://github.com/vaibhavpatil007" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                     <a href="https://www.linkedin.com/in/vaibhav-patil-2086051a6/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                   <a href="https://twitter.com/vaibhavpatil007" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://dev.to/vaibhavpatil007" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faDev} />
                    </a>
                    <a href="https://stackoverflow.com/users/17333459/vaibhav-patil?tab=profile" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faStackOverflow} />
                    </a>
                </div>
                <p>© {new Date().getFullYear()} Vaibhav Patil. All rights reserved.</p>
            </div>
        </footer>
      </div>

    </div>
  );
};

export default InfoPanel;