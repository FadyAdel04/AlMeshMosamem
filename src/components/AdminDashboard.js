import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(usersList);
    };

    fetchStudents();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul className="nav-tabs">
          <li className="active">Students</li>
          <li>Courses</li>
          <li>Payment</li>
          <li>Settings</li>
        </ul>
      </div>
  
      {/* Main Content */}
      <div className="main-content">
        <h1 className="dashboard-title">Student List</h1>
  
        {/* Status Section */}
        <div className="status-section">
          <div className="status-item">Total Students<br />{students.length}</div>
          <div className="status-item">Online Students<br />1</div>
          <div className="status-item">Pending Approval<br />2</div>
        </div>
  
        {/* Student Table */}
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Subscribed Course</th>
              <th>Join Date</th>
              <th>Gender</th>
              <th>Group Details</th>
              <th>Approval Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td> {/* Use index + 1 for sequential ID */}
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.mobile}</td>
                <td>{student.subscribedCourse}</td>
                <td>
                  {student.joinDate ? student.joinDate.toDate().toLocaleDateString() : 'N/A'}
                </td>
                <td>{student.gender}</td>
                <td>{student.groupDetails}</td>
                <td>{student.approvalStatus}</td>
                <td>
                  <button disabled={student.approvalStatus === 'Approved'}>Approve</button>
                  <button>Refuse</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
