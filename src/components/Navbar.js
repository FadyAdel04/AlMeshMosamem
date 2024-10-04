import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import logo from "../source/logo.png";
import { translations } from "../translations/translations";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AiOutlineDown } from "react-icons/ai"; // Import arrow icon
import { doc, getDoc } from "firebase/firestore"; // Firestore methods
import { db, auth } from "../firebaseConfig"; // Import Firebase Auth and Firestore
import { onAuthStateChanged } from "firebase/auth"; // Import the auth state listener

const Navbar = ({ language, setLanguage }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const [userData, setUserData] = useState(null); // State for user data
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, "users", user.uid); // Use the user's UID
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserData(docSnap.data()); // Set user data when logged in
        } else {
          console.error("No such document!");
        }
      } else {
        setUserData(null); // Reset user data when logged out
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to profile page
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      navigate("/signin"); // Navigate to home after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a className="logo" href="/">
          <img src={logo} alt="Logo" />
        </a>

        <div className="nav-content">
          {/* Hamburger Menu Icon */}
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={handleToggle}
          >
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

          {/* Navbar Links */}
          <nav
            aria-label="Global"
            className={`nav-links ${isNavOpen ? "active" : ""}`}
          >
            <ul className="nav-items">
              <li>
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  onClick={handleToggle}
                >
                  {translations[language].home}
                </Link>
              </li>
              <li>
                <Link
                  to="courses"
                  smooth={true}
                  duration={500}
                  onClick={handleToggle}
                >
                  {translations[language].courses}
                </Link>
              </li>
              <li>
                <Link
                  to="work"
                  smooth={true}
                  duration={500}
                  onClick={handleToggle}
                >
                  {translations[language].work}
                </Link>
              </li>
              <li>
                <Link
                  to="channel-sec"
                  smooth={true}
                  duration={500}
                  onClick={handleToggle}
                >
                  {translations[language].channel}
                </Link>
              </li>
              <li>
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  onClick={handleToggle}
                >
                  {translations[language].contact}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Language Selector and User Info */}
          <div className="auth-buttons">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="language-selector"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>

            {/* User Authentication Links */}
            <div className="login-buttons">
              {userData ? (
                <div
                  className="user-info"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="menu">
                    <span className="username-btn">{`${userData.firstName} ${userData.lastName}`}</span>
                    <AiOutlineDown />
                  </div>
                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      <button
                        onClick={handleProfileClick}
                        className="logout-btn"
                      >
                        {translations[language].auth.profile}
                      </button>
                      <button onClick={handleLogout} className="logout-btn">
                      {translations[language].auth.logout}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/signin")}
                  className="profile-button"
                >
                  {translations[language].auth.login}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
