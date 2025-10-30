// frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useauth'; // Custom hook for cleaner access

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    // Get the login function from your Auth Context
    const { login } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const userData = await login(email, password);
            
            // Check the role returned from the context/backend
            if (userData.role === 'Employer') {
                navigate('/employer/dashboard');
            } else {
                navigate('/'); // Job Seeker goes to the job listing page
            }
        } catch (err) {
            // Handle errors thrown by the login function
            const msg = err.error || 'Login failed. Check credentials.';
            setError(msg);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Sign In to HireMe AI</h2>
            
            {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded border border-red-300">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <input type="email" name="email" placeholder="Email Address" required 
                    onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500" />
                
                {/* Password */}
                <input type="password" name="password" placeholder="Password" required 
                    onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500" />
                
                {/* Submit Button */}
                <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150">
                    Sign In
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register Here</Link>
            </p>
        </div>
    );
};

export default LoginPage;