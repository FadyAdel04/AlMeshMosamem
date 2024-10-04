// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth method
import { auth } from "./firebaseConfig"; // Import your Firebase auth instance
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Work from "./components/Work";
import Channel from "./components/Channel";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/profile"; // Corrected case for Profile import
import AdminDashboard from "./components/AdminDashboard"; // Import AdminDashboard component
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

const App = () => {
  const [language, setLanguage] = useState("en"); // Pass language state
  const [loading, setLoading] = useState(true); // Loading state for authentication
  const [user, setUser] = useState(null); // State for the current user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state based on the authentication state
      setLoading(false); // Set loading to false after checking auth state
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  return (
    <Router>
      <div className="App">
        <Navbar language={language} setLanguage={setLanguage} /> {/* Pass language and setLanguage */}

        <Routes>
          {/* Public Routes */}
          <Route path="/signin" element={<SignIn language={language} />} />
          <Route path="/signup" element={<SignUp language={language} />} />

          {/* Protected Routes */}
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          <Route path="/admin-dashboard" element={<PrivateRoute element={AdminDashboard} />} /> {/* Protect Admin Dashboard */}

          {/* Main content routes */}
          <Route
            path="/"
            element={
              <>
                <Hero language={language} />
                <Courses language={language} />
                <Work language={language} />
                <Channel language={language} />
                <Contact language={language} />
                <Footer language={language} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
