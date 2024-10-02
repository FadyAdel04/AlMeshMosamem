// src/components/Hero.js
import React from "react";
import Slider from "react-slick"; // Import React Slick slider
import { Link } from "react-scroll";
import heroImage1 from "../source/1.jpg"; // Background images for the slides
import heroImage2 from "../source/2.jpg"; // Background images for the slides
import heroImage3 from "../source/3.jpg"; // Background images for the slides
import heroImage4 from "../source/4.jpg"; // Background images for the slides
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: false, // Disable arrows for clean look
    fade: true,    // Smooth transition between slides
  };

  return (
    <section id="home" className="hero-section">
      <Slider {...settings} className="hero-slider">
        {/* Slide 1 */}
        <div className="hero-slide">
          <div
            className="hero-slide-background"
            style={{ backgroundImage: `url(${heroImage1})` }}
          >
          
          </div>
        </div>

        {/* Slide 2 */}
        <div className="hero-slide">
          <div
            className="hero-slide-background"
            style={{ backgroundImage: `url(${heroImage2})` }}
          >
            
          </div>
        </div>

        {/* Slide 3 */}
        <div className="hero-slide">
          <div
            className="hero-slide-background"
            style={{ backgroundImage: `url(${heroImage3})` }}
          >
            
          </div>
        </div>

        {/* Slide 4 */}
        <div className="hero-slide">
          <div
            className="hero-slide-background"
            style={{ backgroundImage: `url(${heroImage4})` }}
          >
            
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Hero;
