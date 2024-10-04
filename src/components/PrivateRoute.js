// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Import your Firebase auth instance

const PrivateRoute = ({ element: Component }) => {
  const user = auth.currentUser; // Get the current authenticated user

  return user ? <Component /> : <Navigate to="/signin" />; // Redirect to signin if not authenticated
};

export default PrivateRoute;
