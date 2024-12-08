import React, { useState, useEffect } from 'react';

// Function to fetch grievances by category
const fetchRequestsByCategory = async (category) => {
    try {
        const response = await fetch(`http://localhost:5000/api/grievances/category/${category}`, {
            credentials: 'include' // Include credentials for session
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
            credentials: 'include' // Include credentials for session
        });
        if (!response.ok) {
            throw new Error('Failed to update status');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const FoodDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusUpdates, setStatusUpdates] = useState({}); // For storing status updates

    // Fetch requests when the component mounts
    useEffect(() => {
        const fetchRequests = async () => {
            const fetchedRequests = await fetchRequestsByCategory('Food');
            setRequests(fetchedRequests);
            setFilteredRequests(fetchedRequests); // Set filtered to the full list initially
        };
        fetchRequests();
    }, []);

    // Filter requests based on search query
    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = requests.filter(request =>
            request.studentName.toLowerCase().includes(lowercasedQuery) ||
            request.studentId.toLowerCase().includes(lowercasedQuery) ||
            request.department.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredRequests(filtered);
    }, [searchQuery, requests]);

    // Handle updating the status of a grievance
    const handleStatusChange = async (id, newStatus) => {
        const updatedRequest = await updateRequestStatus(id, newStatus);
        if (updatedRequest) {
            // Update the local state with the new status
            setRequests(requests.map(request => (request._id === id ? updatedRequest : request)));
            setFilteredRequests(filteredRequests.map(request => (request._id === id ? updatedRequest : request)));
        }
    };

    // Handle selecting a new status from dropdown
    const handleSelectChange = (id, newStatus) => {
        setStatusUpdates(prev => ({ ...prev, [id]: newStatus }));
    };

    return (
        <div>
            <center><h2>Food Dashboard</h2></center>
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
                                        <option value="In Progress">In Progress</option>
                                        <option value="Solved">Solved</option>
                                    </select>
                                    <button onClick={() => handleStatusChange(request._id, statusUpdates[request._id] || request.status)}>
                                        Update
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

export default FoodDashboard;
