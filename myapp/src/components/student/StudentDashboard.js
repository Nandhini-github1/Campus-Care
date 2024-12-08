import React, { useEffect, useState, useCallback } from 'react';
import CreateGrievance from './CreateGrievance';
import './stulogin.css';

const StudentDashboard = () => {
    const [grievances, setGrievances] = useState([]);
    const [loadingGrievances, setLoadingGrievances] = useState(false);
    const [grievancesError, setGrievancesError] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // For storing the search input

    const fetchStudentProfile = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Failed to fetch profile');
            const profileData = await response.json();
            setStudentData(profileData);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }, []);

    const fetchStudentGrievances = useCallback(async () => {
        setLoadingGrievances(true);
        setGrievancesError('');

        try {
            const response = await fetch('http://localhost:5000/api/grievances', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Failed to fetch grievances');
            const grievancesData = await response.json();
            setGrievances(grievancesData);
        } catch (error) {
            setGrievancesError(error.message);
        } finally {
            setLoadingGrievances(false);
        }
    }, []);

    useEffect(() => {
        fetchStudentProfile();
        fetchStudentGrievances();
    }, [fetchStudentProfile, fetchStudentGrievances]);

    const handleGrievanceSubmitted = () => {
        fetchStudentGrievances();
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter grievances based on the search term (by name or complaint title)
    const filteredGrievances = grievances.filter((grievance) => {
        return (
            (grievance.complaintTitle &&
                grievance.complaintTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (grievance.studentName &&
                grievance.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="dashboard">
            <h2>My Dashboard</h2>

            <div className="profile-display">
                {studentData ? (
                    <div>
                        <h3>Welcome, {studentData.username}</h3>
                        <p>Student ID: {studentData.studentId}</p>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>

            <div className="create-grievance-section">
                <h2>Create Request</h2>
                <CreateGrievance onGrievanceSubmitted={handleGrievanceSubmitted} />
                <br/>
                <br/>
                <br/>

            </div>
            <br/>
             <br/> 
             <br/>
            <div className="grievances-section">
                <h3>My Requests</h3>
                
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by name or complaint title..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <br/>
                <br/>
                {loadingGrievances ? (
                    <p>Loading grievances...</p>
                ) : grievancesError ? (
                    <p>Error: {grievancesError}</p>
                ) : filteredGrievances.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Request Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGrievances.map((grievance) => (
                                <tr key={grievance._id}>
                                    <td>{grievance.complaintTitle}</td>
                                    <td>{grievance.complaintDescription}</td>
                                    <td>{grievance.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No grievances found</p>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
