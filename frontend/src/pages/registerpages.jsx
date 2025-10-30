// frontend/src/pages/RegisterPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contest/authcontext';
import axios from 'axios';

const API_BASE_URL = 'https://hirme-ai-project-6.onrender.com/api';// Use your API base URL

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Job Seeker', // Default role
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    // We only need the login function from context for direct sign-in after registration
    const { login } = useContext(AuthContext); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // 1. Send registration data to the backend
            const res = await axios.post(`${API_BASE_URL}/auth/register`, formData);
            
            // 2. If registration is successful, automatically log the user in
            //    (Alternatively, you can just navigate to the login page)
            const { email, password } = formData;
            await login(email, password); 

            // 3. Navigate based on the selected role
            if (formData.role === 'Employer') {
                navigate('/employer/dashboard');
            } else {
                navigate('/'); // Job Seeker goes to the job listing page
            }
            
        } catch (err) {
            // Display error message from the backend
            const msg = err.response?.data?.error || 'Registration failed. Please try again.';
            setError(msg);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Join HireMe AI</h2>
            
            {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded border border-red-300">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection (Crucial for HireMe AI) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">I am a:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                    >
                        <option value="Job Seeker">Job Seeker</option>
                        <option value="Employer">Employer</option>
                    </select>
                </div>

                {/* Name */}
                <input type="text" name="name" placeholder="Full Name" required 
                    onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500" />
                
                {/* Email */}
                <input type="email" name="email" placeholder="Email Address" required 
                    onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500" />
                
                {/* Password */}
                <input type="password" name="password" placeholder="Password" required 
                    onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500" />
                
                {/* Submit Button */}
                <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150">
                    Register as {formData.role}
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign In</Link>
            </p>
        </div>
    );
};

export default RegisterPage;