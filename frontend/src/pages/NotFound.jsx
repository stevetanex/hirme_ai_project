// frontend/src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 p-8 rounded-xl shadow-lg">
            <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
            <h2 className="text-4xl font-semibold text-gray-800 mt-4 mb-6">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
                The resource you requested could not be located. It might have been moved or doesn't exist.
            </p>
            <Link 
                to="/" 
                className="py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFound;