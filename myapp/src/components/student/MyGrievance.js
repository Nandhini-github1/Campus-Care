import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom'; // Import Navigate for redirect

const MyGrievance = () => {
    const { grievanceId } = useParams(); // Get grievance ID from URL params
    const [grievance, setGrievance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Check if the student is logged in by looking for studentData in localStorage
    const isStudentLoggedIn = () => {
        const studentData = localStorage.getItem('studentData');
        return !!studentData; // Check if studentData exists in localStorage
    };

    useEffect(() => {
        if (!isStudentLoggedIn()) {
            setError('User not logged in');
            setLoading(false);
            return;
        }
    
        const storedGrievances = localStorage.getItem('grievances');
        if (storedGrievances) {
            const grievancesArray = JSON.parse(storedGrievances);
            const localGrievance = grievancesArray.find(g => g._id === grievanceId);
            if (localGrievance) {
                setGrievance(localGrievance);
                setLoading(false);
                return;
            }
        }
    
        const fetchGrievance = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/grievances/${grievanceId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch grievance');
                }
    
                const data = await response.json();
                setGrievance(data);
    
                // Store only the specific grievance in localStorage, not the entire array
                const updatedGrievances = storedGrievances
                    ? [...JSON.parse(storedGrievances).filter(g => g._id !== grievanceId), data]
                    : [data];
                localStorage.setItem('grievances', JSON.stringify(updatedGrievances));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchGrievance();
    }, [grievanceId]);
    

    if (!isStudentLoggedIn()) {
        return <Navigate to="/student-login" />; // Redirect to login if not logged in
    }

    if (loading) return <p>Loading grievance...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="grievance-details">
            {grievance ? (
                <div>
                    <h2>Grievance Details</h2>
                    <p><strong>Title:</strong> {grievance.complaintTitle}</p>
                    <p><strong>Description:</strong> {grievance.complaintDescription}</p>
                    <p><strong>Status:</strong> {grievance.status}</p>
                    <p><strong>Submitted by:</strong> {grievance.studentName}</p>
                    <p><strong>Department:</strong> {grievance.department}</p>
                </div>
            ) : (
                <p>Grievance not found</p>
            )}
        </div>
    );
};

export default MyGrievance;
