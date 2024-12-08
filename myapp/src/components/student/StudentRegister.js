import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stulogin.css';

const StudentRegister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [studentId, setStudentId] = useState('');
    const [department, setDepartment] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, studentId, department }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Registration successful');
                navigate('/student-login'); // Navigate to login page after successful registration
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (error) {
            setError('Error registering');
        }
    };

    return (
        <div className="login-form">
            <h2>Student Registration</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default StudentRegister;
