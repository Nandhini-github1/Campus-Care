import React, { useState, useEffect } from 'react';

const DepartmentDashboard = ({ department }) => {
    const [grievances, setGrievances] = useState([]);

    // Fetch grievances for the selected department
    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/grievances/dashboard/${department}`);
                const data = await response.json();
                if (response.ok) {
                    setGrievances(data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching grievances:', error);
            }
        };

        if (department) {
            fetchGrievances();
        }
    }, [department]);

    return (
        <div>
            <h2>{department} Dashboard</h2>
            {grievances.length > 0 ? (
                <ul>
                    {grievances.map((grievance) => (
                        <li key={grievance._id}>
                            {grievance.complaintTitle} - {grievance.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No grievances found for this department.</p>
            )}
        </div>
    );
};

export default DepartmentDashboard;
