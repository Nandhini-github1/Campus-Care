import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import AdminLogin from './components/admin/AdminLogin';
import StudentLogin from './components/student/StudentLogin';
import StudentRegister from './components/student/StudentRegister';
import HostelLogin from './components/hostel/HostelLogin';
import FoodLogin from './components/food/FoodLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import CreateGrievance from './components/student/CreateGrievance';
import HostelDashboard from './components/hostel/HostelDashboard';
import CollegeLogin from './components/college/CollegeLogin';
import CollegeDashboard from './components/college/CollegeDashboard';
import FoodDashboard from './components/food/FoodDashboard';
import ProfileDisplay from './components/student/ProfileDisplay';
import MyGrievance from './components/student/MyGrievance';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import './styles.css';

const App = () => {
    const isStudentLoggedIn = () => {
        const studentData = localStorage.getItem('studentData');
        return !!studentData; // Check if studentData exists in localStorage
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/college-login" element={<CollegeLogin />} />
                <Route path="/college-dashboard" element={<CollegeDashboard />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/register" element={<StudentRegister />} />

                {/* Protected Routes */}
                <Route 
                    path="/create-grievance" 
                    element={isStudentLoggedIn() ? <CreateGrievance /> : <Navigate to="/student-login" />} 
                />
                <Route 
                    path="/student-dashboard" 
                    element={isStudentLoggedIn() ? <StudentDashboard /> : <Navigate to="/student-login" />} 
                />
                <Route 
                    path="/profile-display" 
                    element={isStudentLoggedIn() ? <ProfileDisplay /> : <Navigate to="/student-login" />} 
                />

                {/* Hostel & Food Routes */}
                <Route path="/hostel-login" element={<HostelLogin />} />
                <Route path="/hostel-dashboard" element={<HostelDashboard />} />
                <Route path="/food-login" element={<FoodLogin />} />
                <Route path="/food-dashboard" element={<FoodDashboard />} />

                {/* Department Dashboard Route */}
                <Route 
                    path="/grievances/:grievanceId" 
                    element={isStudentLoggedIn() ? <MyGrievance /> : <Navigate to="/student-login" />} 
                />
                
            </Routes>
        </Router>
    );
};

export default App;
