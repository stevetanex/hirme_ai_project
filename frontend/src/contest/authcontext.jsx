// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Replace with your Render backend base URL
const API_BASE_URL = 'https://hirme-ai-project-7.onrender.com/api'; // (or whatever your project number is)

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize state from local storage on load
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);
    const [loading, setLoading] = useState(true);

    // Set Authorization header for all Axios requests when token changes
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

            // Store user details from backend response
            const { token: newToken, role: newRole, id } = res.data;
            
            setToken(newToken);
            setRole(newRole);
            setUser({ id, role: newRole });
            
            // Store role locally for persistence
            localStorage.setItem('role', newRole); 

            return res.data; // Return data for navigation success
        } catch (err) {
            // Handle error, e.g., show message
            console.error('Login Failed:', err.response.data.error);
            throw err.response.data;
        }
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        setUser(null);
        localStorage.removeItem('role');
        // Token is automatically removed from localStorage and headers via useEffect
    };

    return (
        <AuthContext.Provider value={{ user, token, role, loading, login, logout, isEmployer: role === 'Employer' }}>
            {/* Only render children once loading is false */}
            {!loading && children} 
        </AuthContext.Provider>
    );
};

export default AuthContext;