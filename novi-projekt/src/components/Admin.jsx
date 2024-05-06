import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ManageWorkshops from './ManageWorkshops';
import ManageInstructors from './ManageInstructors';
import ManageOrganizations from './ManageOrganizations';

function Admin() {
    return (
        <div>
            <h1>Administration Dashboard</h1>
            <nav>
                <Link to="workshops">Manage Workshops</Link> | 
                <Link to="instructors">Manage Instructors</Link> | 
                <Link to="organizations">Manage Organizations</Link>
            </nav>
            <Routes>
                <Route path="workshops" element={<ManageWorkshops />} />
                <Route path="instructors" element={<ManageInstructors />} />
                <Route path="organizations" element={<ManageOrganizations />} />
            </Routes>
        </div>
    );
}

export default Admin;
