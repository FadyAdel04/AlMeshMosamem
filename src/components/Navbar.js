import React, { useState } from "react";
import { Link } from "react-scroll";
import logo from "../source/logo.png";
import { translations } from "../translations/translations";

const Navbar = ({ language, setLanguage }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a className="logo" href="/">
          <img src={logo} alt="Logo" />
        </a>

        <div className="nav-content">
          <button className="menu-toggle" aria-label="Toggle menu" onClick={handleToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="menu-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 100-2H3a1 1 0 000 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm-14 6h14a1 1 0 100-2H3a1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <nav aria-label="Global" className={`nav-links ${isNavOpen ? "active" : ""}`}>
            <ul className="nav-items">
              <li>
                <Link to="home" smooth={true} duration={500} onClick={handleToggle}>
                  {translations[language].home}
                </Link>
              </li>
              <li>
                <Link to="courses" smooth={true} duration={500} onClick={handleToggle}>
                  {translations[language].courses}
                </Link>
              </li>
              <li>
                <Link to="work" smooth={true} duration={500} onClick={handleToggle}>
                  {translations[language].work}
                </Link>
              </li>
              <li>
                <Link to="channel-sec" smooth={true} duration={500} onClick={handleToggle}>
                  {translations[language].channel}
                </Link>
              </li>
              <li>
                <Link to="contact" smooth={true} duration={500} onClick={handleToggle}>
                  {translations[language].contact}
                </Link>
              </li>
            </ul>

            </nav>
            <div className="auth-buttons">
              <select value={language} onChange={handleLanguageChange} className="language-selector">
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
