import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import { translations } from "../translations/translations"; // Import translations

const SignUp = ({ language }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [gender, setGender] = useState("");
  const [groupDetails, setGroupDetails] = useState("");
  const navigate = useNavigate();

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleProfilePictureUpload = async (file, userId) => {
    const storageRef = ref(storage, `profilePictures/${userId}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gender || !groupDetails) {
      toast.error(translations[language].authup.error); // Use translated error message
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let profilePictureURL = "";
      if (profilePicture) {
        profilePictureURL = await handleProfilePictureUpload(profilePicture, user.uid);
      }

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        mobile,
        subscribedCourse: "None", // Adjust based on future logic
        joinDate: new Date(),
        isAdmin: false,
        profilePicture: profilePictureURL,
        gender,
        groupDetails,
        approvalStatus: "Pending",
      });

      toast.success(translations[language].authup.success); // Use translated success message
      navigate("/");
    } catch (error) {
      toast.error(translations[language].authup.error + error.message); // Use translated error message
    }
  };

  return (
    <div className={`signup-container ${language}`}>
      <h2 className="signup-title">{translations[language].authup.title}</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={translations[language].authup.firstNamePlaceholder} // Translated placeholder
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder={translations[language].authup.lastNamePlaceholder} // Translated placeholder
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="tel"
          placeholder={translations[language].authup.mobilePlaceholder} // Translated placeholder
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="email"
          placeholder={translations[language].authup.emailPlaceholder} // Translated placeholder
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder={translations[language].authup.passwordPlaceholder} // Translated placeholder
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="input-file"
        />

        {/* Gender Selection */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="input-field"
        >
          <option value="">{translations[language].authup.genderPlaceholder || "Select Gender"}</option> {/* You can add translation for gender if available */}
          <option value="Male">{translations[language].authup.maleOption || "Male"}</option>
          <option value="Female">{translations[language].authup.femaleOption || "Female"}</option>
        </select>

        {/* Group Details */}
        <input
          type="text"
          placeholder={translations[language].authup.groupDetailsPlaceholder || "Group Details"} // Translated placeholder
          value={groupDetails}
          onChange={(e) => setGroupDetails(e.target.value)}
          required
          className="input-field"
        />

        <button type="submit" className="form-button">
          {translations[language].authup.signUpButton} {/* Translated button text */}
        </button>
      </form>
      <div className="signup-prompt">
        <p>{translations[language].authup.prompt} <a href="/signin">{translations[language].authup.signInText}</a></p> {/* Translated footer text */}
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default SignUp;
