import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';// import { Router } from 'react-router-dom';
// custom
import Drawer from '../components/Drawer';
// pages - auth
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
// pages - users
import HomePage from '../pages/users/Home';
import TourPage from '../pages/users/Tour';
// pages - general
import NotFoundPage from '../pages/404';
import TOSPage from '../pages/TOS';
import PrivacyPage from '../pages/Privacy';
// pages - adminUI
import DashboardPage from '../pages/Dashboard';
import MediaPage from '../pages/Media';
import ReservationsPage from '../pages/Reservations';
import SchedulePage from '../pages/Schedule';
import ToursPage from '../pages/Tours';
import BlogsPage from '../pages/Blogs';
import UsersPage from '../pages/Users';
import SettingsPage from '../pages/Settings';
// components
import Footer from '../components/Footer';
// auth
// import { AuthContext } from './contexts/AuthContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useRefresh } from '../hooks/useRefresh';

export default function App() {
    // const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const { isAuthenticated, user } = useAuthContext();
    const { refresh } = useRefresh();
    // const {drawerWidth, setDrawerWidth} = useState(0);

    console.log('authContext: ', isAuthenticated, user);
    useEffect(() => {
        refresh();
        // document.getElementsByTagName('nav')[0].getAttribute.width = drawerWidth;
    } , []);
    

    return (               
        isAuthenticated && user.role === 'admin' ? (    
            <Routes>  
                {/* <Drawer />
                <main className='flex flex-col w-screen justify-center pt-2 pr-2 pb-2'
                    style={{
                        marginLeft: '272px'
                    }}> */}
                {/*  h-screen */}
                {/* <Routes> */}
                <Route path="/dashboard" element={<AdminWrapper><DashboardPage /></AdminWrapper>} />
                <Route path="/media" element={<AdminWrapper><MediaPage /></AdminWrapper>} />
                <Route path="/reservations" element={<AdminWrapper><ReservationsPage /></AdminWrapper>} />
                <Route path="/schedule" element={<AdminWrapper><SchedulePage /></AdminWrapper>} />
                <Route path="/tours" element={<AdminWrapper><ToursPage /></AdminWrapper>} />
                <Route path="/blogs" element={<AdminWrapper><BlogsPage /></AdminWrapper>} />
                <Route path="/users" element={<AdminWrapper><UsersPage /></AdminWrapper>} />
                <Route path="/settings" element={<AdminWrapper><SettingsPage /></AdminWrapper>} />
                <Route path="/tos" element={<AdminWrapper><TOSPage /></AdminWrapper>} />
                <Route path="/privacy" element={<AdminWrapper><PrivacyPage /></AdminWrapper>} />
                {/* special */}
                {/* <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<NotFoundPage />} /> */}
                {/* </Routes> */}
                {/* <Footer /> */}
                {/* </main> */}
            </Routes>
        ) : (
            <main className='flex w-screen h-screen justify-center items-center'>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/tos" element={<TOSPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </main>
        )
    );

}

function AdminWrapper({children}: any) {
    return (
        <>
            <Drawer />
            <main className='flex flex-col w-screen justify-center pt-2 pr-2 pb-2'
                style={{
                    marginLeft: '272px'
                }}>
                {children}
                <Footer />
            </main>
            
        </>
    );
}

function GeneralWrapper({children}: any) {
    return (
        <>
            <Drawer />
            <main className='flex flex-col w-screen justify-center pt-2 pr-2 pb-2'
                style={{
                    marginLeft: '272px'
                }}>
                {children}
                <Footer />
            </main>
            
        </>
    );
}