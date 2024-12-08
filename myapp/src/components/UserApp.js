// UserApp.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Login successful');
                onLogin(data.user); // Pass the user data to parent component
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error logging in');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <button type="submit">Login</button>
        </form>
    );
};

const Profile = ({ user }) => {
    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Password:</strong> {user.password}</p>
        </div>
    );
};

const UserApp = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    return (
        <div>
            {!user ? (
                <Login onLogin={handleLogin} />
            ) : (
                <Profile user={user} />
            )}
        </div>
    );
};

export default UserApp;
