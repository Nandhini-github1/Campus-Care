import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './colstyle.css';

const CollegeLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Assuming the credentials for College Dashboard should be 'a' and '1'
        if (username === 'a' && password === '1') {
            navigate('/college-dashboard'); // Update the route to '/college-dashboard'
        } else {
            alert('Invalid login credentials');
        }
    };

    return (
        <div className="login-form">
            <h2>College Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default CollegeLogin;
