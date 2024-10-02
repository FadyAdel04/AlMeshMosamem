import React, { useState } from "react";
import { MdExpandMore, MdChevronRight } from "react-icons/md";
import courses from "../data/courses";
import { translations } from "../translations/translations"; // Import translations
import whatsApp from "../source/icons/pngwing.com (2).png";

const Courses = ({ language }) => {
  return (
    <section className="courses">
      <h2 className={`section-title ${language}`}>
        {translations[language].courses}
      </h2>
      <div className="course-cards">
        {courses.map((course) => {
          const courseTranslation = translations[language].course; // Get course translations
          return (
            <div className="course-card" key={course.id}>
              <div className="course-img-section">
                <img
                  src={course.img}
                  alt={course.title}
                  className="course-image"
                />
                {/* Course price and WhatsApp button */}
                <div className="course-price-whatsapp">
                  <span className="course-price">E£{course.price}</span>{" "}
                  {/* Display the course price */}
                  <button className="whatsapp-btn">
                    <img
                      src={whatsApp}
                      alt="WhatsApp"
                      className="whatsapp-icon"
                    />
                    {translations[language].course.booknow}
                  </button>
                </div>
              </div>
              <div className="course-body">
                <h3 className={`course-title ${language}`}>
                  {courseTranslation.title}
                </h3>{" "}
                {/* Use translated title */}
                <h4 className={`course-instructor ${language}`}>
                  {courseTranslation.instructor}
                </h4>{" "}
                {/* Use translated instructor */}
                <p className={`course-description ${language}`}>
                  {courseTranslation.description}
                </p>{" "}
                {/* Use translated description */}
                <div className={`course-points ${language}`}>
                  {Object.entries(course.curriculum).map(
                    ([program, lessons]) => (
                      <CurriculumSection
                        program={program}
                        lessons={lessons}
                        language={language}
                        key={program}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const CurriculumSection = ({ program, lessons, language }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="program-section">
      <h5
        onClick={() => setIsOpen(!isOpen)}
        className={`toggle-header ${isOpen ? "active" : ""}`}
      >
        <img src={lessons.logo} alt={program} className="program-icon" />
        {translations[language].course.curriculum[program].title}{" "}
        {/* Use translated program title */}
        <span className="toggle-arrow">
          {isOpen ? <MdExpandMore /> : <MdChevronRight />}
        </span>
      </h5>
      <ul className={`lesson-list ${isOpen ? "open" : ""}`}>
        <div className="lesson-grid">
          <li>
            {translations[language].course.curriculum[program].lessons[0]}
          </li>{" "}
          {/* Always show the first lesson */}
          {isOpen &&
            translations[language].course.curriculum[program].lessons
              .slice(1)
              .map((lesson, index) => <li key={index}>{lesson}</li>)}
        </div>
      </ul>
    </div>
  );
};

export default Courses;
