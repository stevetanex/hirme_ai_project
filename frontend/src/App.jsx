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

// frontend/src/App.jsx

// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// -----------------------------------------------------------------
// IMPORTS MATCHING YOUR LOWERCASE FILE/FOLDER NAMES
// -----------------------------------------------------------------

// General Imports
import Navbar from './components/layout/navbar.jsx'; 
import NotFound from './pages/notfound.jsx'; 

// Public Pages (Using your exact lowercase filenames)
import JobListPage from './pages/joblistpage.jsx'; 
import LoginPage from './pages/loginpage.jsx';    
import RegisterPage from './pages/registerpages.jsx'; 
import JobDetailsPage from './pages/jobdetailspage.jsx'; 

// Employer Protected Pages (Using your exact lowercase filenames)
import EmployerDashboard from './pages/empdashboard.jsx'; 
import JobForm from './pages/jobform.jsx'; 

// Authentication Component (Using your exact lowercase filename)
import ProtectedRoute from './components/auth/protectedroute.jsx'; 

// -----------------------------------------------------------------
// Main Application Component
// -----------------------------------------------------------------

const App = () => {
    return (
        <Router>
            <Navbar /> 
            <main className="container mx-auto p-4 pt-20"> 
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<JobListPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/jobs/:id" element={<JobDetailsPage />} /> 

                    {/* PROTECTED EMPLOYER ROUTES */}
                    <Route element={<ProtectedRoute allowedRoles={['Employer']} />}>
                        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                        <Route path="/employer/job/new" element={<JobForm />} />
                        <Route path="/employer/job/edit/:id" element={<JobForm />} /> 
                    </Route>
                    
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;