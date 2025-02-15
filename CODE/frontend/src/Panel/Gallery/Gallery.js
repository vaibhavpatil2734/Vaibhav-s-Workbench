import React, { useState, useEffect } from "react";
import ReactImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Import Lightbox styles
import "./Gallery.css";

export default function Gallery() {
  const images = [
    { src: "./A2rtboard.png", caption: "Beautiful Abstract Art" },
    { src: "./Artb12oard 1.png", caption: "Modern Digital Creation" }
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [fade, setFade] = useState(false);

  // Function to open lightbox
  const openLightbox = () => setIsLightboxOpen(true);

  // Function to close lightbox
  const closeLightbox = () => setIsLightboxOpen(false);

  // Auto-slide effect every 4 seconds with smooth caption change
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(false);
      }, 500);
    }, 4500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="gallery-container">
      <div>
        <h1 className="gallery-title">Gallery</h1>
        <div className="gallery-image-container" onClick={openLightbox}>
          <img
            src={images[currentImage].src}
            alt={`Image ${currentImage + 1}`}
            className="gallery-image"
          />
        </div>
        {isLightboxOpen && (
          <ReactImageLightbox
            mainSrc={images[currentImage].src}
            nextSrc={images[(currentImage + 1) % images.length].src}
            prevSrc={images[(currentImage - 1 + images.length) % images.length].src}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={() =>
              setCurrentImage((currentImage - 1 + images.length) % images.length)
            }
            onMoveNextRequest={() =>
              setCurrentImage((currentImage + 1) % images.length)
            }
          />
        )}

        <div className={`caption-box ${fade ? "fade-out" : "fade-in"}`}>
          <h4 className="caption-text">{images[currentImage].caption}</h4>
        </div>
      </div>
    </div>
  );
}
