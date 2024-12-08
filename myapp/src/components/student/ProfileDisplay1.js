import React from 'react';
import './stulogin.css'; // Ensure this path is correct

const ProfileDisplay = ({ studentData }) => {
    return (
        <div className="profile-display">
            <div className="pro">
                <h3>My Profile</h3>
            </div>
            <p><strong>Username:</strong> {studentData?.username ? studentData.username : 'Username not found'}</p>
            <p><strong>Student ID:</strong> {studentData?.studentId ? studentData.studentId : 'Student ID not found'}</p>
        </div>
    );
};

export default ProfileDisplay;
