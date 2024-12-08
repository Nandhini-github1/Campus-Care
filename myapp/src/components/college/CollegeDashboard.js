import React, { useState, useEffect } from 'react';

const CollegeDashboard = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusUpdates, setStatusUpdates] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch requests by category from backend
    const fetchRequestsByCategory = async (category) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:5000/api/grievances/category/${category}`);
            if (!response.ok) {
                throw new Error('Error fetching requests');
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError('Failed to fetch grievances');
            console.error('Error fetching requests:', error);
        }
    };

    // Fetch grievances when category is selected
    useEffect(() => {
        if (selectedCategory) {
            const fetchRequests = async () => {
                const fetchedRequests = await fetchRequestsByCategory(selectedCategory);
                if (fetchedRequests) {
                    setRequests(fetchedRequests);
                    setFilteredRequests(fetchedRequests);
                }
            };
            fetchRequests();
        }
    }, [selectedCategory]);

    // Search functionality
    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = requests.filter(request =>
            request.studentName.toLowerCase().includes(lowercasedQuery) ||
            request.studentId.toLowerCase().includes(lowercasedQuery) ||
            request.department.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredRequests(filtered);
    }, [searchQuery, requests]);

    // Update the status of a grievance request
    const updateRequestStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/grievances/${id}/status`, {
                method: 'PUT',  // Update to match backend method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            const updatedRequest = await response.json();
            setSuccess('Status updated successfully');
            return updatedRequest;
        } catch (error) {
            setError('Error updating status');
            console.error('Error updating status:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const updatedRequest = await updateRequestStatus(id, newStatus);
        if (updatedRequest) {
            // Update the request in both requests and filteredRequests state
            setRequests(requests.map(request => (request._id === id ? updatedRequest : request)));
            setFilteredRequests(filteredRequests.map(request => (request._id === id ? updatedRequest : request)));
        }
    };

    const handleSelectChange = (id, newStatus) => {
        setStatusUpdates(prev => ({ ...prev, [id]: newStatus }));
        setSuccess('');  // Clear previous success message
    };

    return (
        <div className='college-dashboard'>
            <center><h2>College Dashboard</h2></center>
            <div>
                <label style={{color:'black',fontSize:'25px'}} htmlFor="categorySelect">Select Category:</label>
                <br/><br/>
                <select
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="College">College</option>
                    <option value="Counseling">Counseling</option>
                    <option value="Certificate">Certificate</option>
                </select>
            </div>

            <input
                type="text"
                placeholder="Search by Name, ID, Department"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />

            {loading && <p>Loading grievances...</p>}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

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
                                        <option value="pending">Pending</option>
                                        <option value="in progress">In Progress</option>
                                        <option value="solved">Solved</option>
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

export default CollegeDashboard;
