import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { translations } from "../translations/translations"; // Import translations

import design1 from "../source/work/1.jpg";
import design2 from "../source/work/2.jpg";
import design3 from "../source/work/3.jpg";
import design4 from "../source/work/4.jpg";
import design5 from "../source/work/5.jpg";
import design6 from "../source/work/6.jpg";
import design7 from "../source/work/7.jpg";
import design8 from "../source/work/8.jpg";
import design9 from "../source/work/9.jpg";
import design10 from "../source/work/10.jpg";
import design11 from "../source/work/11.jpg";
import design12 from "../source/work/12.jpg";
import design13 from "../source/work/13.jpg";

const Work = ({ language }) => {
  const studentWork = [
    { id: 1, imgSrc: design1, alt: "Design 1" },
    { id: 2, imgSrc: design2, alt: "Design 2" },
    { id: 3, imgSrc: design3, alt: "Design 3" },
    { id: 4, imgSrc: design4, alt: "Design 4" },
    { id: 5, imgSrc: design5, alt: "Design 5" },
    { id: 6, imgSrc: design6, alt: "Design 6" },
    { id: 7, imgSrc: design7, alt: "Design 7" },
    { id: 8, imgSrc: design8, alt: "Design 8" },
    { id: 9, imgSrc: design9, alt: "Design 9" },
    { id: 10, imgSrc: design10, alt: "Design 10" },
    { id: 11, imgSrc: design11, alt: "Design 11" },
    { id: 12, imgSrc: design12, aly: "Design 12" },
    { id: 13, imgSrc: design13, alt: "Design 13" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="work">
      <br />
      <h2 className={`section-title ${language}`}>{translations[language].studentWork}</h2> {/* Translate title */}
      <div className="work-slider-container">
        <Slider {...settings}>
          {studentWork.map((work) => (
            <div key={work.id} className="work-item">
              <img src={work.imgSrc} alt={work.alt} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Work;
