import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminstyle.css'
const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'a' && password === '1') {
            navigate('/admin-dashboard');
        } else {
            alert('Invalid login credentials');
        }
    }

    return (
        <div className="login-form">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="usernsme"
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
}

export default AdminLogin;
