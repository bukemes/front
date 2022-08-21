import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';// import { Router } from 'react-router-dom';
// custom
import Drawer from './components/Drawer';
// pages - auth
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
// pages - general
import NotFoundPage from './pages/404';
import TOSPage from './pages/TOS';
import PrivacyPage from './pages/Privacy';
// pages - interface
import DashboardPage from './pages/Dashboard';
import MediaPage from './pages/Media';
import ReservationsPage from './pages/Reservations';
import SchedulePage from './pages/Schedule';
import ToursPage from './pages/Tours';
import BlogsPage from './pages/Blogs';
import UsersPage from './pages/Users';
import SettingsPage from './pages/Settings';
// auth
// import { AuthContext } from './contexts/AuthContext';
import { useAuthContext } from './hooks/useAuthContext';
import { useRefresh } from './hooks/useRefresh';

export default function App() {
    // const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const { isAuthenticated } = useAuthContext();
    const { refresh } = useRefresh();

    console.log('isAuthenticated: ', isAuthenticated);
    useEffect(() => {
        refresh();
    } , []);

    return (               
        isAuthenticated ? (    
            <Router >
                <Drawer />
                <main className='dark:bg-slate-700 bg-slate-200 
                        flex w-screen h-screen justify-center p-2'>
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
                        <Route path="*" element={<NotFoundPage />} />
                        {/* <Route path="/logout" element={<LogoutPage />} /> */}
                    </Routes>
                </main>
            </Router>   
        ) : (
            <Router>
                <main className='dark:bg-slate-700 bg-slate-200 
                        flex w-screen h-screen justify-center items-center'>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/tos" element={<TOSPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </main>
            </Router>
        )
    );
}