import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Work from "./components/Work";
import Channel from "./components/Channel";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  const [language, setLanguage] = useState("en"); // Pass language state

  return (
    <Router>
      <div className="App">
        <Navbar language={language} setLanguage={setLanguage} /> {/* Pass language and setLanguage */}
        <Hero language={language} />
        <Courses language={language} />
        <Work language={language} />
        <Channel language={language} />
        <Contact language={language} />
        <Footer language={language} />
      </div>
    </Router>
  );
};

export default App;
