import React, { useState, useEffect } from "react";

const images = [
  "/src/assets/covers/1.jpg",
  "/src/assets/covers/2.jpg",
  "/src/assets/covers/3.jpg",
  "/src/assets/covers/4.jpg",
];

const HomeCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-transparent mt-6 mb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full h-[500px] relative overflow-hidden rounded-2xl shadow-lg">
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover object-center transition-all duration-700"
            loading="lazy"
          />
          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-3 w-3 rounded-full border-2 ${
                  idx === current ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;