import React, { useState, useEffect } from "react";
import "../Panel.css";
import "./Home.css";

export default function Home() {
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

    useEffect(() => {
        const typingSpeed = isDeleting ? 80 : 120;
        const pauseTime = 1200;

        const updateText = () => {
            const role = roles[roleIndex];

            if (isDeleting) {
                setCurrentRole(role.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
            } else {
                setCurrentRole(role.substring(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
            }

            if (!isDeleting && charIndex === role.length) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }
        };

        const typingInterval = setInterval(updateText, typingSpeed);
        return () => clearInterval(typingInterval);
    }, [charIndex, isDeleting, roleIndex, roles]);

    return (
        <div className="HomeBox">
            <div className="content">
                <h1>
                    Hello There! <span className="wave">👋</span>
                </h1>
                <h2 className="name">I'M <span className="highlight">VAIBHAV PATIL</span></h2>
                <p className="typing-box">{currentRole || "\u00A0"}</p>
            </div>
        </div>
    );
}
