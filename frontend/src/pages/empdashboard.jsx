// frontend/src/pages/EmployerDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useauth';

const API_BASE_URL = 'https://hirme-ai-project-6.onrender.com/api';

const EmployerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Get logged-in user details

    // Fetch jobs created ONLY by the logged-in employer
    const fetchEmployerJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Note: The backend route /api/jobs is public, but we need a dedicated Employer route
            // For now, we will filter on the client OR (RECOMMENDED) create a /api/jobs/mine route on the backend
            
            // For simplicity, let's assume ALL jobs are returned but we filter/display only those matching the user ID 
            // ⚠️ Best Practice: Create a specific protected GET /api/jobs/mine route on the backend.
            
            const res = await axios.get(API_BASE_URL); 
            
            // Client-side filtering (TEMPORARY - Use dedicated backend route for scale!)
            const myJobs = res.data.data.filter(job => job.employer === user.id); 
            setJobs(myJobs);

        } catch (err) {
            setError('Failed to fetch your job posts.');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user?.id) {
            fetchEmployerJobs();
        }
    }, [user, fetchEmployerJobs]);

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job post?")) {
            return;
        }
        try {
            // The DELETE route is protected and checks for ownership on the backend
            await axios.delete(`${API_BASE_URL}/${jobId}`);
            // Remove job from state without full re-fetch
            setJobs(jobs.filter(job => job._id !== jobId));
        } catch (err) {
            setError('Failed to delete job. Check server logs.');
        }
    };

    if (loading) return <div className="text-center mt-20 text-lg">Loading dashboard...</div>;
    if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-indigo-700">Employer Dashboard</h1>
                <Link to="/employer/job/new" className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition">
                    + Post New Job
                </Link>
            </div>
            
            {jobs.length === 0 ? (
                <div className="text-center p-10 bg-gray-100 rounded-lg">
                    <p className="text-xl text-gray-600">You have no active job posts. Get started now!</p>
                    <Link to="/employer/job/new" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                        Post Your First Job &rarr;
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {jobs.map(job => (
                        <div key={job._id} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
                                <p className="text-gray-500 mt-1">📍 {job.location} | {job.type}</p>
                            </div>
                            <div className="flex space-x-3">
                                <Link to={`/employer/job/edit/${job._id}`} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(job._id)} className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EmployerDashboard;