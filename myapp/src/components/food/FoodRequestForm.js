import React, { useState } from 'react';

const FoodRequestForm = ({ onAddRequest }) => {
    const [requestDate, setRequestDate] = useState('');
    const [requestCategory, setRequestCategory] = useState('');
    const [requestDescription, setRequestDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = {
            requestId: Date.now(), // Unique ID for the request
            requestDate,
            requestCategory,
            requestDescription,
            requestStatus: 'Pending', // Default status
            studentId: '123456', // Example student ID
            studentName: 'John Doe', // Example student name
            studentDepartment: 'UG', // Example student department
        };
        onAddRequest(newRequest);
        alert('Food request submitted successfully.');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="requestDate">Request Date:</label>
            <input
                type="date"
                id="requestDate"
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
                required
            />
            <label htmlFor="requestCategory">Category:</label>
            <input
                type="text"
                id="requestCategory"
                value={requestCategory}
                onChange={(e) => setRequestCategory(e.target.value)}
                required
            />
            <label htmlFor="requestDescription">Description:</label>
            <textarea
                id="requestDescription"
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                required
            />
            <button type="submit">Submit Request</button>
        </form>
    );
};

export default FoodRequestForm;
