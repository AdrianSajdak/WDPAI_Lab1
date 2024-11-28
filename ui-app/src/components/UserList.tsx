import { useState, useEffect } from 'react';
import { FiTrash } from 'react-icons/fi';
import axios from 'axios';
import './styles.css';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    role: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        role: '',
        acceptedPrivacyPolicy: false
    });
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        role: '',
        acceptedPrivacyPolicy: ''
    });

    // Pobieranie użytkowników z backendu
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Błąd podczas pobierania użytkowników:', error));
    }, []);

    // Walidacja formularza
    const validate = () => {
        let valid = true;
        let errors = {
            first_name: '',
            last_name: '',
            role: '',
            acceptedPrivacyPolicy: ''
        };

        if (!newUser.first_name) {
            errors.first_name = 'Imię jest wymagane';
            valid = false;
        }

        if (!newUser.last_name) {
            errors.last_name = 'Nazwisko jest wymagane';
            valid = false;
        }

        if (!newUser.role) {
            errors.role = 'Rola jest wymagana';
            valid = false;
        }

        if (!newUser.acceptedPrivacyPolicy) {
            errors.acceptedPrivacyPolicy = 'Musisz zaakceptować politykę prywatności';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    // Dodawanie użytkownika
    const handleAddUser = () => {
        if (!validate()) {
            return;
        }

        // Przygotowanie danych do wysłania (bez pola acceptedPrivacyPolicy)
        const userData = {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            role: newUser.role
        };

        axios.post('http://localhost:8000/api/users/', userData)
            .then(response => {
                setUsers([...users, response.data]);
                setNewUser({
                    first_name: '',
                    last_name: '',
                    role: '',
                    acceptedPrivacyPolicy: false
                });
                setErrors({
                    first_name: '',
                    last_name: '',
                    role: '',
                    acceptedPrivacyPolicy: ''
                });
            })
            .catch(error => console.error('Błąd podczas dodawania użytkownika:', error));
    };

    // Usuwanie użytkownika
    const handleDeleteUser = (id: number) => {
        axios.delete(`http://localhost:8000/api/users/${id}/`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => console.error('Błąd podczas usuwania użytkownika:', error));
    };

    return (
        <div className="user-list-container">
            <h2>Let's level up your brand, together</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
                <label htmlFor="first-name">First name</label>
                <input 
                    type="text" 
                    placeholder="First name" 
                    value={newUser.first_name} 
                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                />
                {errors.first_name && <span className="error">{errors.first_name}</span>}
                
                <label htmlFor="first-name">Last name</label>
                <input 
                    type="text" 
                    placeholder="Last name" 
                    value={newUser.last_name} 
                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                />
                {errors.last_name && <span className="error">{errors.last_name}</span>}
                
                <label htmlFor="first-name">Role</label>
                <select 
                    value={newUser.role} 
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                    <option value="" disabled>Role</option>
                    <option value="Manager">Manager</option>
                    <option value="CTO">CTO</option>
                    <option value="Product Designer">Product Designer</option>
                    <option value="Developer">Developer</option>
                    <option value="Tester">Tester</option>
                </select>
                {errors.role && <span className="error">{errors.role}</span>}
                
                <label>
                    <input 
                        type="checkbox" 
                        checked={newUser.acceptedPrivacyPolicy} 
                        onChange={(e) => setNewUser({ ...newUser, acceptedPrivacyPolicy: e.target.checked })}
                    />
                    You agree to our friendly <a href="#" className="privacy-policy-link">privacy policy</a>.
                </label>
                {errors.acceptedPrivacyPolicy && <span className="error">{errors.acceptedPrivacyPolicy}</span>}
                
                <button type="submit">SUBMIT</button>
            </form>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-list-item">
                        <div>
                            <strong>{user.first_name} {user.last_name}</strong>
                            <p>{user.role}</p>
                        </div>
                        <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                            <FiTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default UserList;
