// frontend/src/pages/JobListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// Import useAuth if you want to conditionally show "Save Job" buttons
// import { useAuth } from '../hooks/useAuth';

// Replace with your Render backend base URL
const API_BASE_URL = 'https://hirme-ai-project-6.onrender.com/api';

const JobListPage = () => {
    // State for job data
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State for filters (Matching the query parameters used in backend/controllers/jobController.js)
    const [filters, setFilters] = useState({ 
        title: '', 
        location: '', 
        skills: '', // Comma-separated string
        minSalary: '', 
        maxSalary: '' 
    });

    // State for pagination
    const [pagination, setPagination] = useState({ 
        page: 1, 
        pages: 1, // Total number of pages
        limit: 5 // Jobs per page (default to 5 for testing)
    });

    // Function to handle fetching jobs from the backend
    const fetchJobs = useCallback(async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            // Construct query parameters from the current filter and pagination state
            const params = new URLSearchParams({
                ...filters,
                page,
                limit: pagination.limit
            }).toString();

            const res = await axios.get(`${API_BASE_URL}?${params}`);
            
            // Update state with data and new pagination info from the server
            setJobs(res.data.data);
            setPagination({
                ...pagination,
                page: res.data.page,
                pages: res.data.pages,
                count: res.data.count,
            });
            
        } catch (err) {
            setError('Failed to fetch jobs. Server may be down or filters are invalid.');
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }, [filters, pagination.limit]);

    // Effect to run the initial fetch and re-fetch when filters or limits change
    useEffect(() => {
        // Fetch jobs for the current page when the component loads or filters change
        fetchJobs(pagination.page); 
    }, [fetchJobs]);

    // Handles changes in filter input fields
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Handles the search button click (resets to page 1)
    const handleSearch = (e) => {
        e.preventDefault();
        // Reset page to 1 when filters are applied
        if (pagination.page !== 1) {
             setPagination(prev => ({ ...prev, page: 1 }));
        } else {
             // If already on page 1, manually trigger fetchJobs
             fetchJobs(1);
        }
    };

    // Handles page number changes
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            setPagination(prev => ({ ...prev, page: newPage }));
            fetchJobs(newPage); // Fetch new page data
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-8">
                Find Your Next Role 🚀
            </h1>
            
            {/* -------------------- Filtering Form -------------------- */}
            <form onSubmit={handleSearch} className="bg-gray-100 p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-6 gap-4">
                
                <input type="text" name="title" placeholder="Job Title" 
                    onChange={handleFilterChange} className="p-3 border rounded col-span-2" />
                
                <input type="text" name="location" placeholder="Location" 
                    onChange={handleFilterChange} className="p-3 border rounded col-span-2" />
                
                <input type="text" name="skills" placeholder="Skills (e.g., React, Node)" 
                    onChange={handleFilterChange} className="p-3 border rounded col-span-2" />
                
                <input type="number" name="minSalary" placeholder="Min Salary" 
                    onChange={handleFilterChange} className="p-3 border rounded" />
                
                <input type="number" name="maxSalary" placeholder="Max Salary" 
                    onChange={handleFilterChange} className="p-3 border rounded" />
                
                <button type="submit" disabled={loading} className="py-3 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-150 col-span-2 md:col-span-1">
                    {loading ? 'Searching...' : 'Search'}
                </button>
                <button type="button" onClick={() => { setFilters({title: '', location: '', skills: '', minSalary: '', maxSalary: ''}); fetchJobs(1); }} className="py-3 px-4 bg-gray-400 text-white font-bold rounded-md hover:bg-gray-500 transition duration-150 col-span-2 md:col-span-1">
                    Reset
                </button>
            </form>

            {/* -------------------- Job List Display -------------------- */}
            {error && <p className="text-red-600 font-medium text-center">{error}</p>}
            
            {loading && <p className="text-center text-lg text-indigo-500">Loading job results...</p>}

            {!loading && jobs.length === 0 && !error && (
                <p className="text-center text-xl text-gray-500">No jobs found matching your criteria.</p>
            )}

            <div className="space-y-6">
                {jobs.map(job => (
                    <div key={job._id} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 hover:shadow-2xl transition duration-300">
                        <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
                        <p className="text-lg text-indigo-600 mt-1">
                            💰 ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()} ({job.type})
                        </p>
                        <p className="text-gray-500 mt-2">📍 {job.location}</p>
                        <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 text-sm font-medium bg-gray-200 text-gray-700 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-end space-x-3">
                            {/* Link to Job Details Page (You'll build this next) */}
                            <button className="text-indigo-600 hover:text-indigo-800 font-semibold transition">
                                View Details &rarr;
                            </button>
                            {/* Future 'Save Job' button goes here */}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* -------------------- Pagination Controls -------------------- */}
            {!loading && pagination.pages > 1 && (
                <div className="flex justify-center items-center mt-10 space-x-4">
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 hover:bg-gray-400 transition"
                    >
                        Previous
                    </button>
                    
                    <span className="text-lg font-medium text-gray-700">
                        Page **{pagination.page}** of **{pagination.pages}**
                    </span>
                    
                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 hover:bg-gray-400 transition"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobListPage;