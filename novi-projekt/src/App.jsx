import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './UserRoleContext';
import Navbar from './components/Navbar';
import Workshops from './components/Workshops';
import Instructors from './components/Instructors';
import AdminWorkshops from './components/AdminWorkshops';
import AdminInstructors from './components/AdminInstructors';
import "./App.css";

function App() {
    return (
        <RoleProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Workshops />} />  // Set Workshops as the home page
                    <Route path="/instructors" element={<Instructors />} />
                    <Route path="/admin/workshops" element={<AdminWorkshops />} />
                    <Route path="/admin/instructors" element={<AdminInstructors />} />
                                       <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </Router>
        </RoleProvider>
    );
}

export default App;
