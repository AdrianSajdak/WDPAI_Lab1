import { Link, useNavigate } from 'react-router-dom';
import './Toolbar.css';
import { useEffect, useState } from 'react';

const Toolbar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const accessToken = sessionStorage.getItem('accessToken');

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        setUsername('');
        navigate('/login');
    };

    useEffect(() => {
        if (accessToken) {
            fetch('http://localhost:8000/api/me/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch user data');
                }
            })
            .then((data) => setUsername(data.username))
            .catch((error) => console.error('Error:', error));
        }
    }, [accessToken]);    

    return (
        <div className="toolbar-container">
            <div className="toolbar-content">
                <div className="toolbar-left">
                    <Link to={accessToken ? ("/users") : ("/login")} className="toolbar-link">Home</Link>
                </div>
                <div className='toolbar-center'>
                    {username ? `Witaj, ${username}!` : 'Witaj!'}
                </div>
                <div className="toolbar-right">
                    {accessToken ? (
                        <button className="toolbar-button" onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="toolbar-link">Login</Link>
                            <Link to="/register" className="toolbar-link">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Toolbar;
