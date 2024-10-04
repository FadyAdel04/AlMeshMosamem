import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For eye icon
import { translations } from "../translations/translations"; // Import translations

const SignIn = ({ language }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      toast.success(translations[language].authin.success); // Use translated success message
      navigate("/"); // Navigate to dashboard
    } catch (error) {
      toast.error(translations[language].authin.error + error.message); // Use translated error message
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">{translations[language].authin.title}</h2>
      <form className="signin-form" onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder={translations[language].authin.emailPlaceholder} // Use translated placeholder
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={translations[language].authin.passwordPlaceholder} // Use translated placeholder
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" className="form-button">
          {translations[language].authin.signUpButton} {/* Use translated button text */}
        </button>
      </form>
      <div className="signin-footer">
        <p>{translations[language].authin.prompt} <a href="/signup">{translations[language].authin.signInText}</a></p>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default SignIn;
