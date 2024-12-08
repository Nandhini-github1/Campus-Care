import React, { useEffect, useState } from 'react';
import './adminstyle.css';

const AdminDashboard = () => {
    const [grievances, setGrievances] = useState([]);
    const [filteredGrievances, setFilteredGrievances] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [departmentAssignments, setDepartmentAssignments] = useState({});

    // Fetch all grievances for the Admin dashboard
    const fetchAllGrievances = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/grievances', { method: 'GET', credentials: 'include' });
            if (!response.ok) throw new Error('Failed to fetch grievances.');
            const data = await response.json();
            setGrievances(data);
            setFilteredGrievances(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllGrievances();
    }, []);

    // Filter grievances based on search query
    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = grievances.filter(grievance =>
            (grievance.studentName?.toLowerCase() || '').includes(lowercasedQuery) ||
            (grievance.studentId?.toLowerCase() || '').includes(lowercasedQuery) ||
            (grievance.department?.toLowerCase() || '').includes(lowercasedQuery) ||
            (grievance.assignedDepartment?.toLowerCase() || '').includes(lowercasedQuery)
        );
        setFilteredGrievances(filtered);
    }, [searchQuery, grievances]);

    // Function to assign department to a grievance
    const assignDepartment = async (grievanceId, department) => {
        if (!department) {
            alert('Please select a department');
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/grievances/${grievanceId}/assign`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assignedDepartment: department }),
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to assign department.');
            const updatedGrievance = await response.json();
            // Update the local grievances state
            setGrievances(prevGrievances =>
                prevGrievances.map(g => g._id === updatedGrievance._id ? updatedGrievance : g)
            );
            alert('Department assigned successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                   <input
                        type="text"
                        placeholder="Search Request"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <table>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Student ID</th>
                                <th>Department</th>
                                <th>Complaint Title</th>
                                <th>Complaint Description</th>
                                <th>Status</th>
                                <th>Assign Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGrievances.map((grievance) => (
                                <tr key={grievance._id}>
                                    <td>{grievance.studentName || 'N/A'}</td>
                                    <td>{grievance.studentId || 'N/A'}</td>
                                    <td>{grievance.department || 'N/A'}</td>
                                    <td>{grievance.complaintTitle}</td>
                                    <td>{grievance.complaintDescription}</td>
                                    <td>{grievance.status}</td>
                                    <td>
                                        <select
                                            value={departmentAssignments[grievance._id] || grievance.assignedDepartment || ''}
                                            onChange={(e) => setDepartmentAssignments({
                                                ...departmentAssignments,
                                                [grievance._id]: e.target.value,
                                            })}
                                        >
                                            <option value="">Select</option>
                                            <option value="Hostel">Hostel</option>
                                            <option value="Food">Food</option>
                                            <option value="College">College</option>
                                            <option value="Counseling">Counseling</option>
                                            <option value="Certificate">Certificate</option>
                                        </select>
                                        <button onClick={() => assignDepartment(grievance._id, departmentAssignments[grievance._id])}>
                                            Assign
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;