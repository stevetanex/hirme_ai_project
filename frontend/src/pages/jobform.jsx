// frontend/src/pages/JobForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://hirme-ai-project-6.onrender.com/api'; 

const JobForm = () => {
    const { id } = useParams(); // Check if we are in edit mode
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        skills: '', // String to be comma-separated later
        salaryRange: { min: 0, max: 0 },
        type: 'Full-time'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isEditing = Boolean(id);

    // Fetch existing job data if in edit mode
    useEffect(() => {
        if (isEditing) {
            const fetchJob = async () => {
                try {
                    const res = await axios.get(`${API_BASE_URL}/${id}`);
                    const job = res.data.data;
                    
                    // Format skills array back into a comma-separated string for the input field
                    setFormData({
                        ...job,
                        skills: job.skills.join(', '), 
                    });
                } catch (err) {
                    setError('Failed to fetch job for editing.');
                }
            };
            fetchJob();
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'min' || name === 'max') {
            setFormData(prev => ({ 
                ...prev, 
                salaryRange: { ...prev.salaryRange, [name]: Number(value) } 
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            // Prepare data: convert skills string to an array of strings
            const dataToSend = {
                ...formData,
                skills: formData.skills.split(',').map(skill => skill.trim()),
            };

            if (isEditing) {
                // UPDATE (PUT request)
                await axios.put(`${API_BASE_URL}/${id}`, dataToSend);
            } else {
                // CREATE (POST request)
                await axios.post(API_BASE_URL, dataToSend);
            }

            navigate('/employer/dashboard'); // Go back to dashboard after success
        } catch (err) {
            const msg = err.response?.data?.error || 'An error occurred while saving the job.';
            setError(Array.isArray(msg) ? msg.join(', ') : msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl">
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-8">
                {isEditing ? 'Edit Job Posting' : 'Create New Job'}
            </h2>
            
            {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded border border-red-300">Error: {error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Title and Type */}
                <div className="grid grid-cols-3 gap-4">
                    <input type="text" name="title" placeholder="Job Title" required value={formData.title} onChange={handleChange}
                        className="p-3 border rounded col-span-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    
                    <select name="type" value={formData.type} onChange={handleChange} required
                        className="p-3 border rounded focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                {/* Location */}
                <input type="text" name="location" placeholder="Location (e.g., Remote, San Francisco)" required value={formData.location} onChange={handleChange}
                    className="w-full p-3 border rounded focus:ring-indigo-500 focus:border-indigo-500" />

                {/* Description */}
                <textarea name="description" placeholder="Job Description (Detailed)" required value={formData.description} onChange={handleChange} rows="5"
                    className="w-full p-3 border rounded focus:ring-indigo-500 focus:border-indigo-500"></textarea>

                {/* Skills */}
                <input type="text" name="skills" placeholder="Required Skills (Comma-separated: React, Node.js, MongoDB)" required value={formData.skills} onChange={handleChange}
                    className="w-full p-3 border rounded focus:ring-indigo-500 focus:border-indigo-500" />

                {/* Salary Range */}
                <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="min" placeholder="Minimum Salary" required value={formData.salaryRange.min} onChange={handleChange}
                        className="p-3 border rounded focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="number" name="max" placeholder="Maximum Salary" required value={formData.salaryRange.max} onChange={handleChange}
                        className="p-3 border rounded focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={loading}
                    className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150 disabled:bg-indigo-400">
                    {loading ? 'Saving...' : isEditing ? 'Update Job' : 'Post Job'}
                </button>
            </form>
        </div>
    );
};

export default JobForm;