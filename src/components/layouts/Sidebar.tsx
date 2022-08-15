import React, { useEffect, useState } from 'react';
// navigation
import { Link } from 'react-router-dom';
// components
import { Sidebar, Button, } from 'flowbite-react';
import { 
    HiChartPie, 
    HiPhotograph,
    HiCalendar,
    HiGlobe,
    HiBadgeCheck,
    HiCog,
    HiLogout,
    HiUsers,
} from 'react-icons/hi';
// manually import svg icons
// import adn from '../../assets/fontawesome/6.0.0/svgs/brands/adn.svg';
// i18n
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

export default function Drawer() { // props: any // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const { t } = useTranslation();
    const [theme, setTheme] = useState(localStorage.getItem('color-theme') || 'dark');

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const changeTheme = (theme: string) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('color-theme', theme);
    };

    useEffect(() => {
        // set theme from localstorage.
        // should probably be moved to an init class and imported in root
        changeTheme(theme);
        // console.log('[]');
        // get lang from cookie/storage/...
        // i18n.changeLanguage('nl');
    } , []);

    useEffect(() => {
        changeTheme(theme);
        // console.log('[theme]');
    } , [theme]);

    return (
        <nav className="w-fit bg-gray-50">
            <Sidebar aria-label="Default sidebar ">
                <Sidebar.Items>
                    {/* logo */}
                    <Sidebar.Logo
                        href="#"
                        // img={adn}
                        img='/svg/vite.svg'
                        imgAlt="Flowbite logo"
                    >
                        {t('title')}
                    </Sidebar.Logo>

                    {/* admin - site */}
                    <Sidebar.ItemGroup>
                        <Link to="/dashboard">
                            <Sidebar.Item
                                as="span"
                                icon={HiChartPie}
                            >  {t('sidebar.dashboard')}
                            </Sidebar.Item>
                        </Link>
                        
                        <Link to="/media">
                            <Sidebar.Item
                                as="span"
                                icon={HiPhotograph}
                                label="3"
                                labelColor="alternative"
                            > {t('sidebar.media')}
                            </Sidebar.Item>
                        </Link>

                        <Link to="/reservations">
                            <Sidebar.Item
                                as="span"
                                icon={HiBadgeCheck}
                                label='7'
                            > {t('sidebar.reservations')}
                            </Sidebar.Item>
                        </Link>                    
                    </Sidebar.ItemGroup>

                    {/* admin - content */}
                    <Sidebar.ItemGroup>
                        <Link to="/schedule">
                            <Sidebar.Item
                                as="span"
                                icon={HiCalendar}
                                label="1"
                                labelColor="alternative"
                            > {t('sidebar.schedule')}
                            </Sidebar.Item>       
                        </Link>     

                        <Link to="/tours">
                            <Sidebar.Item
                                as="span"
                                label="5"
                                labelColor="alternative"
                                icon={HiGlobe}
                            > {t('sidebar.tours')}
                            </Sidebar.Item>
                        </Link>

                        <Link to="/blogs">
                            <Sidebar.Item
                                as="span"
                                label="10"
                                labelColor="alternative"
                                icon={HiGlobe}
                            > {t('sidebar.blogs')}
                            </Sidebar.Item>
                        </Link>
                    </Sidebar.ItemGroup>

                    {/* admin - users */}
                    <Sidebar.ItemGroup>

                        <Link to="/users">
                            <Sidebar.Item
                                as="span"
                                icon={HiUsers}
                            > Users
                            </Sidebar.Item>
                        </Link>
                        <Link to="/settings">
                            <Sidebar.Item
                                as="span"
                                icon={HiCog}
                            > Settings
                            </Sidebar.Item>
                        </Link>
                        <Sidebar.Item
                            as="span"
                            icon={HiLogout}
                            // onClick={() => {console.log('logout');}}
                            // label="3"
                        > Logout
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>

                    {/* toggles */}
                    <Sidebar.ItemGroup>
                        <Button.Group>
                            <Button color="gray" onClick={() => changeLanguage('en')}>
                                EN
                            </Button>
                            <Button color="gray" onClick={() => changeLanguage('nl')}>
                                NL
                            </Button>
                        </Button.Group>

                        <Button.Group>
                            <Button color="gray" onClick={() => setTheme('light')}>
                                Light
                            </Button>
                            <Button color="gray" onClick={() => setTheme('dark')}>
                                Dark
                            </Button>
                        </Button.Group>        
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </nav>
    );
}