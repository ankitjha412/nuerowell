import React, { useState, useEffect } from 'react';
import './Carousel1.css';

const Carousel3 = () => {
  const [current, setCurrent] = useState(0);

  // ✅ Slides defined directly inside the component
  const slides = [
    {
      image: "https://media.istockphoto.com/id/1363774646/vector/mental-health.jpg?s=612x612&w=0&k=20&c=tez61I2L6Dp9WGPS2qLHJ9G-9sDRM8Uw3mJJEj1NqFE=",
      href: "#"
    },
    {
      image: "https://i.pinimg.com/736x/35/0f/c1/350fc19dc1194c85b1881c2e7e0f56e0.jpg",
      href: "https://www.headspace.com/"
    },
    {
      image: "https://st4.depositphotos.com/1229718/31571/i/450/depositphotos_315716008-stock-photo-mental-health-support.jpg",
      href: "https://www.talkspace.com/"
    }
  ];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 5000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="carousel-container">
      {slides.map((slide, index) => (
        <a
          href={slide.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`carousel-slide ${index === current ? 'active' : ''}`}
          key={index}
        >
          <img src={slide.image} alt={`Slide ${index + 1}`} />
        </a>
      ))}

      <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
      <button className="carousel-btn next" onClick={nextSlide}>›</button>
    </div>
  );
};

export default Carousel3;
