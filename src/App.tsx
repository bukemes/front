import React, { useState } from 'react';
// import App from './App';
// import './index.css';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';// import { Router } from 'react-router-dom';
import './App.css';
// flowbite
// import { Toast } from 'flowbite-react';
// import {HiFire} from 'react-icons/hi';
// custom
import Drawer from './components/layouts/Sidebar';
// pages
import DashboardPage from './components/pages/Dashboard';
import MediaPage from './components/pages/Media';
import ReservationsPage from './components/pages/Reservations';
import SchedulePage from './components/pages/Schedule';
import ToursPage from './components/pages/Tours';
import BlogsPage from './components/pages/Blogs';
import UsersPage from './components/pages/Users';
import SettingsPage from './components/pages/Settings';
// utilities
// logout function to use on logout route

export default function App() {
    return (            
    // basename="/admin"
        <Router >
            <Drawer />
            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/media" element={<MediaPage />} />
                    <Route path="/reservations" element={<ReservationsPage />} />
                    <Route path="/schedule" element={<SchedulePage />} />
                    <Route path="/tours" element={<ToursPage />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    {/* <Route path="/logout" element={<LogoutPage />} /> */}
                </Routes>
            </main>
        </Router>    
    );
}


// import ReactDOM from 'react-dom/client';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );
