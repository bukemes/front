import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';// import { Router } from 'react-router-dom';
// custom
// pages - auth
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
// pages - users
import HomePage from './pages/users/Home';
import TourPage from './pages/users/Tour';
import ProfilePage from './pages/users/Profile';
// auth
// import { AuthContext } from './contexts/AuthContext';
import { useAuthContext } from './hooks/useAuthContext';
import { useRefresh } from './hooks/useRefresh';

// CUSTOM 
import Admin from './layout/Admin';

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
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tours/:id" element={<TourPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin/*" element={<Admin />} />
            </Routes>
        </Router>
    );

}