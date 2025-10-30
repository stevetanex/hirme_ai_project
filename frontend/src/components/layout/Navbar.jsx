// frontend/src/components/layout/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useauth'; // Assumes you created this hook

const Navbar = () => {
    const { user, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Go to home page after logout
    };

    return (
        <header className="bg-indigo-700 text-white shadow-lg fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center p-4">
                
                {/* Logo/Home Link */}
                <Link to="/" className="text-2xl font-bold hover:text-indigo-200 transition">
                    HireMe AI
                </Link>

                {/* Navigation Links */}
                <nav className="space-x-4 flex items-center">
                    {/* Always visible link */}
                    <Link to="/" className="hover:text-indigo-200">Jobs</Link>

                    {user ? (
                        // --- Links visible when logged in ---
                        <>
                            <span className="text-sm font-light">Welcome, {role}!</span>
                            
                            {role === 'Employer' && (
                                <Link to="/employer/dashboard" className="py-1 px-3 bg-indigo-500 rounded hover:bg-indigo-400 transition">
                                    Dashboard
                                </Link>
                            )}

                            {/* Add Seeker link for Saved Jobs here if implemented */}
                            {/* {role === 'Job Seeker' && (
                                <Link to="/seeker/saved" className="hover:text-indigo-200">Saved</Link>
                            )} */}

                            <button 
                                onClick={handleLogout} 
                                className="py-1 px-3 border border-white rounded hover:bg-white hover:text-indigo-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        // --- Links visible when logged out ---
                        <>
                            <Link to="/login" className="hover:text-indigo-200">Login</Link>
                            <Link to="/register" className="py-1 px-3 bg-green-500 rounded hover:bg-green-600 transition">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;