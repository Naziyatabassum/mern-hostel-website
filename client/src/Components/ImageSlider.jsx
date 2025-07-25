import React, { useEffect, useState } from "react";
import image1 from "../assets/hostel1.jpg";
import image2 from "../assets/hostel2.jpg";
import image3 from "../assets/hostel3.jpg";
import image4 from "../assets/hostel4.jpg";
import image5 from "../assets/hostel5.jpg";

// Array of all images
const images = [image1, image2, image3, image4, image5];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset animation when image changes
    setShowText(false);
    
    // Show text for images 2 and 4 (index 1 and 3)
    if (currentIndex === 1 || currentIndex === 3) {
      // Slight delay before showing text for better animation effect
      const timer = setTimeout(() => {
        setShowText(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full max-w-screen-md h-64 sm:h-80 md:h-96 lg:h-[440px] overflow-hidden rounded-lg shadow-lg relative mx-auto">
      {/* Animated Text Display in top left corner */}
      {(currentIndex === 1 || currentIndex === 3) && (
        <div 
          className={`absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/70 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium
            ${showText 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-8"} 
            transition-all duration-500 transform shadow-lg border-l-4 border-blue-500`}
        >
          <span className={`inline-block ${showText ? "animate-pulse" : ""}`}>
            {currentIndex === 1 ? "Block-1" : "Block-2"}
          </span>
        </div>
      )}

      {/* Image */}
      <img 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex + 1}`} 
        className="w-full h-full object-cover"
      />

      {/* Navigation dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center gap-1 sm:gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-0.5 sm:p-1 rounded-full transition-all z-10"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-0.5 sm:p-1 rounded-full transition-all z-10"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  );
}