import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Ensure to import Firebase Auth and Firestore database instance
import { toast, ToastContainer } from "react-toastify"; // Correct import for toast notifications
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const [editableData, setEditableData] = useState({}); // State for editable data
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [imageFile, setImageFile] = useState(null); // State for the selected image file

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Get the currently logged-in user

      if (user) {
        const userId = user.uid; // Get the user's ID
        try {
          const userDoc = doc(db, "users", userId);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserData(userData);
            setEditableData(userData); // Initialize editable data
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        } finally {
          setLoading(false); // Stop loading when data is fetched or error occurs
        }
      } else {
        setLoading(false); // Stop loading if no user is logged in
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value }); // Update editable data on change
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected image file
  };

  const handleSave = async () => {
    const user = auth.currentUser; // Get the currently logged-in user

    if (user) {
      const userId = user.uid; // Get the user's ID
      try {
        const userDoc = doc(db, "users", userId);

        // Upload the new profile image if a file is selected
        if (imageFile) {
          const storage = getStorage(); // Initialize Firebase Storage
          const storageRef = ref(storage, `profilePictures/${userId}`); // Create a reference to the storage location
          
          // Upload the file
          await uploadBytes(storageRef, imageFile);
          
          // Get the download URL
          const downloadURL = await getDownloadURL(storageRef);
          editableData.profilePicture = downloadURL; // Update the profile picture URL in editable data
        }

        await updateDoc(userDoc, editableData); // Update the user document in Firestore
        setUserData(editableData); // Update the displayed user data
        setIsEditing(false); // Exit edit mode
        toast.success("Profile updated successfully!"); // Notify user of successful update
      } catch (error) {
        console.error("Error updating user data: ", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

  if (!userData) {
    return <div>No user data found.</div>; // Show this message if no user data is available
  }

  // Format joinDate to a readable format (optional, based on data format)
  const formattedJoinDate = userData.joinDate
    ? new Date(userData.joinDate.seconds * 1000).toLocaleDateString()
    : "N/A"; // Adjust for the Firestore timestamp format

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={userData.profilePicture || "defaultProfilePic.png"} // Use a default image if profile picture URL is empty
          alt="Profile"
          className="profile-pic"
        />
        <h1>{`${userData.firstName} ${userData.lastName}`}</h1>
      </div>

      <div className="profile-details">
        <p>
          <strong>Email:</strong>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editableData.email || ""}
              onChange={handleChange}
            />
          ) : (
            userData.email
          )}
        </p>
        <p>
          <strong>Mobile:</strong>
          {isEditing ? (
            <input
              type="text"
              name="mobile"
              value={editableData.mobile || ""}
              onChange={handleChange}
            />
          ) : (
            userData.mobile
          )}
        </p>
        <p>
          <strong>Gender:</strong>
          {isEditing ? (
            <input
              type="text"
              name="gender"
              value={editableData.gender || ""}
              onChange={handleChange}
            />
          ) : (
            userData.gender || "N/A"
          )}
        </p>
        <p>
          <strong>Group Details:</strong>
          {isEditing ? (
            <input
              type="text"
              name="groupDetails"
              value={editableData.groupDetails || ""}
              onChange={handleChange}
            />
          ) : (
            userData.groupDetails || "N/A"
          )}
        </p>
        <p>
          <strong>Join Date:</strong> {formattedJoinDate}
        </p>
        <h3>Enrolled Courses:</h3>
        <p>{userData.subscribedCourse || "None"}</p> {/* Display enrolled courses without editing */}
      </div>

      <div className="edit">
        {isEditing ? (
          <>
            <input type="file" accept="image/*" onChange={handleImageChange} /> {/* File input for image upload */}
            <button onClick={handleSave}>Save Changes</button> {/* Save button */}
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button> // Edit button
        )}
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
