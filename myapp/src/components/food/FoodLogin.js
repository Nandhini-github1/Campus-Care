import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './foodstyle.css';

const FoodLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Assuming the credentials for Food Dashboard should be 'food' and 'foodpass'
        if (username === 'a' && password === '1') {
            navigate('/food-dashboard');
        } else {
            alert('Invalid login credentials');
        }
    };

    return (
        <div className="login-form">
            <h2>Food Login</h2>
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

export default FoodLogin;
