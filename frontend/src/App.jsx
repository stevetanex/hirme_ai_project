// frontend/src/App.jsx

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/layout/Navbar'; // Will create this next
// import JobListPage from './pages/JobListPage'; // Job Seeker browse
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import EmployerDashboard from './pages/EmployerDashboard'; // Protected Employer route
// import NotFound from './pages/NotFound';
// // You will create a Context or use Redux for Auth state management later

// const App = () => {
//     return (
//         <Router>
//             {/* Navbar stays visible on all pages */}
//             <Navbar /> 
//             <main className="container mx-auto p-4 pt-20"> {/* Responsive container, pt-20 for fixed Navbar */}
//                 <Routes>
//                     {/* Public Routes */}
//                     <Route path="/" element={<JobListPage />} />
//                     <Route path="/login" element={<LoginPage />} />
//                     <Route path="/register" element={<RegisterPage />} />
                    
//                     {/* Placeholder for Job Seeker Saved Jobs (Protected) */}
//                     {/* <Route path="/seeker/saved" element={<SavedJobsPage />} /> */}

//                     {/* Employer Routes (Must be protected and role-checked) */}
//                     <Route path="/employer/dashboard" element={<EmployerDashboard />} />
//                     {/* <Route path="/employer/job/new" element={<JobForm />} /> */}
                    
//                     {/* Fallback route */}
//                     <Route path="*" element={<NotFound />} />
//                 </Routes>
//             </main>
//         </Router>
//     );
// };

// export default App;
// frontend/src/App.jsx (Updated Routes)

// ... existing imports ...
// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// General Imports
import Navbar from './components/layout/Navbar'; // Assuming you have a Navbar component
import NotFound from './pages/NotFound'; // Assuming you have a 404 page

// Public Pages
import JobListPage from './pages/joblistpage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/RegisterPage';

// Employer Protected Pages
import EmployerDashboard from './pages/EmployerDashboard';
import JobForm from './pages/JobForm'; // Used for both Create and Edit

// Authentication Component
import ProtectedRoute from './components/auth/ProtectedRoute'; 

const app = () => {
    return (
        <Router>
            <Navbar /> 
            <main className="container mx-auto p-4 pt-20"> 
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<JobListPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* ------------------------------------------- */}
                    {/* PROTECTED EMPLOYER ROUTES (Nested Routes) */}
                    {/* All nested <Route> elements inherit the security check from ProtectedRoute */}
                    <Route element={<ProtectedRoute allowedRoles={['Employer']} />}>
                        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                        <Route path="/employer/job/new" element={<JobForm />} />
                        <Route path="/employer/job/edit/:id" element={<JobForm />} /> 
                    </Route>
                    {/* ------------------------------------------- */}
                    
                    {/* Fallback route for unmatched paths */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
// frontend/src/App.jsx (Add this public route)

// ... existing imports ...
import JobDetailsPage from './pages/jobdetailspage'; // NEW IMPORT

const App = () => {
    return (
        <Router>
            {/* ... */}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<JobListPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* Job Details Route (NEW) */}
                    <Route path="/jobs/:id" element={<JobDetailsPage />} /> 

                    {/* ... (Protected Employer Routes) ... */}
                </Routes>
            {/* ... */}
        </Router>
    );
};