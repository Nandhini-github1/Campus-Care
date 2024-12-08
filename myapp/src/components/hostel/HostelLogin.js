import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './hosstyle.css';

const HostelLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate username and password verification
        if (username === 'a' && password === '1') {
            navigate('/Hostel-dashboard'); // Navigate to student dashboard on successful login
        } else {
            alert('Invalid username or password');
        }
    }

    return (
      <div className="login-form">
        <div>
            <h2>Hostel Login</h2>
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
            <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
}

export default HostelLogin;
