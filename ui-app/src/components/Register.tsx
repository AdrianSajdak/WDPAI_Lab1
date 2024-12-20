import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthStyles.css';

const Register = () => {
    // TODO każde pola jako oddzielny stan
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notification, setNotification] = useState('');
    const [agreed, setAgreed] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        // TODO zablokuj domyślną funkcjonalność SUBMIT formularza
        e.preventDefault();
        if (password !== confirmPassword) {
            setNotification('Hasła się różnią!');
            return;
        }
        try {
            await axios.post('http://localhost:8000/api/register/', { username, email, password });
            setNotification('Rejestracja udana!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            setNotification('Rejestracja nieudana, spróbuj ponownie.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-box">
                <h2>Register</h2>
                {notification && <div className="notification">{notification}</div>}
                <label>Username</label>
                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="form-input"
                />
                <label>E-mail</label>
                <input
                    type="email"
                    placeholder='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                <label>Confirm Password</label>
                <input
                    type="password"
                    placeholder='Password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="form-input"
                />
                <label>
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                />
                You agree to our friendly <a href="/privacy-policy" style={{ color: '#7551FA' }}>privacy policy</a>.
            </label>
                <button type="submit" disabled={!agreed} className="form-button">SUBMIT</button>
            </form>
        </div>
    );
};

export default Register;