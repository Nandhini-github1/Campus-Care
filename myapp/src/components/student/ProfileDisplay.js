import React, { useState, useEffect } from 'react';
import ProfileDisplay1 from './ProfileDisplay1';
import './stulogin.css';

const MyProfile = () => {
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch student data from localStorage on component mount
        const storedStudentData = localStorage.getItem('studentData');
        if (storedStudentData) {
            setStudentData(JSON.parse(storedStudentData));
        } else {
            setError('No student data found. Please log in.');
        }
    }, []);

    return (
        <div className="profile-display">
            {error && <p className="error-message">{error}</p>}
            {studentData ? (
                <ProfileDisplay1 studentData={studentData} />
            ) : (
                <p>Loading student data...</p>
            )}
        </div>
    );
};

export default MyProfile;
