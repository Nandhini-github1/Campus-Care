// AdminMessageForm.js
import React, { useState } from 'react';

const AdminMessageForm = () => {
    const [message, setMessage] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Handle message submission to relevant departments
    const sendMessage = async () => {
        if (!message || selectedCategories.length === 0) {
            alert('Please type a message and select at least one category.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/admin/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, categories: selectedCategories }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to send message.');
            }

            const result = await response.json();
            alert(result.message);
            setMessage('');
            setSelectedCategories([]);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error sending message.');
        }
    };

    // Handle category selection
    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div>
            <h3>Send Message to Department</h3>
            <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <div>
                <label>Select categories:</label>
                <div>
                    <input type="checkbox" id="college" onChange={() => handleCategoryChange('College')} />
                    <label htmlFor="college">College</label>

                    <input type="checkbox" id="hostel" onChange={() => handleCategoryChange('Hostel')} />
                    <label htmlFor="hostel">Hostel</label>

                    <input type="checkbox" id="food" onChange={() => handleCategoryChange('Food')} />
                    <label htmlFor="food">Food</label>

                    <input type="checkbox" id="certificate" onChange={() => handleCategoryChange('Certificate')} />
                    <label htmlFor="certificate">Certificate</label>

                    <input type="checkbox" id="counseling" onChange={() => handleCategoryChange('Counseling')} />
                    <label htmlFor="counseling">Counseling</label>
                </div>
            </div>

            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default AdminMessageForm;
