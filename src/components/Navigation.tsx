import React from 'react';
import { NavLink } from 'react-router-dom';
// i18n
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
// comps
import { Button, Navbar, Dropdown, DarkThemeToggle } from 'flowbite-react';
import { HiGlobe } from 'react-icons/hi';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';


export default function Navigation() {
    const { t } = useTranslation();
    const { isAuthenticated, user } = useAuthContext();
    const { logout } = useLogout();
    // const currentURL = window.location.href; // returns the absolute URL of a page
    // const pathname = window.location.pathname; // returns the current url minus the domain name
    // console.log(currentURL, pathname);
    
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const active = 'block py-2 pr-4 pl-3 md:p-0 bg-blue-700 text-white dark:text-white md:bg-transparent md:text-blue-700';


    const styleActive = 'dark:text-white text-white font-bold '; // bg-blue-700 
    const stylePassive = 'dark:text-gray-400 text-black font-normal';
    return (
        <Navbar
            // className="fixed"
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand>
                <img
                    src="/img/logo.png"
                    className="mr-3 h-6 sm:h-9"
                    alt="Globe with a plane going around it"
                />
                {/* <NavLink to="/" className={({ isActive }) => isActive ? active : '' } > */}
                <span className="mr-5 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    TANIATOURS
                </span>       
                {/* </NavLink> */}
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <DarkThemeToggle />

                <div className='
                    flex flex-col gap-4 ml-2 relative
                    md:flex-row md:items-start md:items-center z-50'
                >
                    <Dropdown
                        arrowIcon={true}
                        inline={true}
                        label={<HiGlobe size={30} className="h-5 w-5 text-gray-500" />}
                    >    
                        <Dropdown.Item onClick={() => changeLanguage('en')}>
                        English
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => changeLanguage('nl')}>
                        Nederlands
                        </Dropdown.Item>
                    </Dropdown>

                    {/* HOME */}
                    <NavLink to="/" className={({ isActive }) => isActive ? styleActive : stylePassive }>Home</NavLink>

                    {/* AUTH RELATED THINGS */}
                    {
                        isAuthenticated ? (
                            <>
                                {user.role === 'admin' ? (
                                    <>
                                        <NavLink to="/admin/media" className={({ isActive }) => isActive ? styleActive : stylePassive }>Dashboard</NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/profile" className={({ isActive }) => isActive ? styleActive : stylePassive }>Profile</NavLink>
                                    </>
                                )}

                                <Button onClick={logout}>Logout</Button> 
                            </>
                            
                        ) : (
                            <NavLink to="/login" className={({ isActive }) => isActive ? styleActive : stylePassive }>Login</NavLink>
                        )
                    }
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}