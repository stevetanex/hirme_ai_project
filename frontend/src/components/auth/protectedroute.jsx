// frontend/src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useauth';

const ProtectedRoute = ({ allowedRoles }) => {
    const { token, role, loading } = useAuth();

    if (loading) {
        return <div className="text-center mt-20 text-lg">Loading user data...</div>; // Show a loading state
    }

    if (!token) {
        // If not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // If logged in but unauthorized role, redirect to home or show error
        return <Navigate to="/" replace />; 
    }

    // User is authorized (logged in and role is correct)
    return <Outlet />;
};

export default ProtectedRoute;