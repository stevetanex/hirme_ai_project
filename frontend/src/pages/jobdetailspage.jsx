// frontend/src/pages/JobDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://hirme-ai-project-7.onrender.com/api';// Use your Vercel API endpoint

const JobDetailsPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch the job and recommendations simultaneously
                const res = await axios.get(`${API_BASE_URL}/${id}`); 
                setJob(res.data.data);
                setRecommendations(res.data.recommendations);
            } catch (err) {
                setError('Failed to load job details. The job may not exist.');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]); // Re-run when the job ID changes (e.g., clicking a recommendation)

    if (loading) return <div className="text-center mt-20 text-lg">Loading job details...</div>;
    if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
    if (!job) return <div className="text-center mt-20 text-xl text-gray-500">Job not found.</div>;

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Job Details (2/3 width) */}
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-2xl">
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600 mb-4">
                    Posted by: **{job.employer.name}**
                </p>
                <p className="text-2xl text-green-600 font-bold mb-6">
                    💰 ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Job Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>

                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                            <span key={index} className="px-4 py-1 text-base font-medium bg-indigo-100 text-indigo-700 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                
                {/* Future 'Apply Now' or 'Save Job' button here */}
            </div>

            {/* Recommendations Sidebar (1/3 width) */}
            <div className="lg:col-span-1">
                <div className="p-6 bg-yellow-50 rounded-xl shadow-lg border border-yellow-200">
                    <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                        <span className="mr-2">💡</span> AI Recommendations
                    </h3>
                    
                    {recommendations.length > 0 ? (
                        <div className="space-y-4">
                            {recommendations.map(rec => (
                                <Link 
                                    key={rec._id} 
                                    to={`/jobs/${rec._id}`} 
                                    className="block p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-150 border-l-4 border-yellow-400"
                                >
                                    <p className="font-semibold text-gray-800">{rec.title}</p>
                                    <p className="text-sm text-gray-600">📍 {rec.location}</p>
                                    <p className="text-xs text-green-700">
                                        ${rec.salaryRange.min} - ${rec.salaryRange.max}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-sm">No highly similar jobs found based on skills.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;