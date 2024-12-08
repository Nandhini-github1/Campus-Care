import React, { useState, useEffect } from 'react';

// Function to fetch grievances by category
const fetchRequestsByCategory = async (category) => {
    try {
        const response = await fetch(`http://localhost:5000/api/grievances/category/${category}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch grievances');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Function to update the status of a grievance
const updateRequestStatus = async (id, status) => {
    try {
        const response = await fetch(`http://localhost:5000/api/grievances/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to update status');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const HostelDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusUpdates, setStatusUpdates] = useState({});

    // Fetch grievances by category "Hostel" when the component mounts
    useEffect(() => {
        const fetchRequests = async () => {
            const fetchedRequests = await fetchRequestsByCategory('Hostel');
            setRequests(fetchedRequests);
            setFilteredRequests(fetchedRequests);
        };
        fetchRequests();
    }, []);

    // Filter requests based on search query
    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = requests.filter((request) =>
            request.studentName.toLowerCase().includes(lowercasedQuery) ||
            request.studentId.toLowerCase().includes(lowercasedQuery) ||
            request.department.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredRequests(filtered);
    }, [searchQuery, requests]);

    // Handle status update for a specific grievance
    const handleStatusChange = async (id, newStatus) => {
        const updatedRequest = await updateRequestStatus(id, newStatus);
        setRequests((prevRequests) => prevRequests.map((request) => (request._id === id ? updatedRequest : request)));
        setFilteredRequests((prevFilteredRequests) => prevFilteredRequests.map((request) => (request._id === id ? updatedRequest : request)));
    };

    // Handle select dropdown change for status updates
    const handleSelectChange = (id, newStatus) => {
        setStatusUpdates((prev) => ({ ...prev, [id]: newStatus }));
    };

    return (
        <div>
            <center><h2>Hostel Dashboard</h2></center>

            <input
                type="text"
                placeholder="Search by Name, ID, Department"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />

            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student ID</th>
                        <th>Department</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((request) => (
                            <tr key={request._id}>
                                <td>{request.studentName}</td>
                                <td>{request.studentId}</td>
                                <td>{request.department}</td>
                                <td>{request.complaintCategory}</td>
                                <td>{request.complaintTitle}</td>
                                <td>{request.complaintDescription}</td>
                                <td>{request.status}</td>
                                <td>
                                    <select
                                        value={statusUpdates[request._id] || request.status}
                                        onChange={(e) => handleSelectChange(request._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="InProgress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                    <button
                                        onClick={() => handleStatusChange(request._id, statusUpdates[request._id] || request.status)}
                                    >
                                        Update Status
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No grievances found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HostelDashboard;
