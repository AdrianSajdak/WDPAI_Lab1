import React, { useState } from 'react';
import axios from 'axios';
import './AuthStyles.css';
import { useNavigate  } from 'react-router-dom';

const Login = () => {
    // TODO każde pola jako oddzielny stan
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        // TODO zablokuj domyślną funkcjonalność SUBMIT formularza
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', { username, password });
            // TODO zapisz a session storage, nie w localstorage!
            sessionStorage.setItem('accessToken', response.data.access);
            sessionStorage.setItem('refreshToken', response.data.refresh);
            setNotification('Logowanie udane!');
            navigate('/users');
        } catch (error) {
            console.error(error);
            setNotification('Logowanie nieudane. Sprawdz poprawność danych.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleLogin} className="form-box">
                <h2>Login</h2>
                {notification && <div className="notification">{notification}</div>}
                <label>Username</label>
                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="form-input"
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-input"
                />
                <button type="submit" className="form-button">SUBMIT</button>
            </form>
        </div>
    );
};

export default Login;
