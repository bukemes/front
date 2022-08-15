import React, { useEffect, useState } from 'react';

// import {Sidebar} from 'flowbite-react';
import { Sidebar, Button } from 'flowbite-react';
import { 
    HiChartPie, 
    // HiViewBoards,
    // HiInbox, 
    // HiUser, 
    // HiShoppingBag, 
    // HiArrowSmRight, 
    // HiTable,
    HiPhotograph,
    HiCalendar,
    HiGlobe,
    HiBadgeCheck,
    HiCog,
    HiLogout,
    HiUsers,
} from 'react-icons/hi';

// import adn from '../../assets/fontawesome/6.0.0/svgs/brands/adn.svg';

// i18n
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

export default function SidebarComponent() { // props: any // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
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
        console.log('useEffect');
        // get lang from cookie/storage/...
        // i18n.changeLanguage('nl');
    } , []);

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
                        <Sidebar.Item
                            href="#"
                            icon={HiChartPie}
                        >  {t('sidebar.dashboard')}
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            icon={HiPhotograph}
                            label="3"
                            labelColor="alternative"
                        > {t('sidebar.media')}
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            label='7'
                            icon={HiBadgeCheck}
                        > {t('sidebar.reservations')}
                        </Sidebar.Item>                    
                    </Sidebar.ItemGroup>

                    {/* admin - content */}
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href="#"
                            label='7'
                            icon={HiBadgeCheck}
                        > {t('sidebar.reservations')}
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            icon={HiCalendar}
                            label="1"
                            labelColor="alternative"
                        > {t('sidebar.schedule')}
                        </Sidebar.Item>            
                        <Sidebar.Item
                            href="#"
                            label="5"
                            labelColor="alternative"
                            icon={HiGlobe}
                        > {t('sidebar.tours')}
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            label="10"
                            labelColor="alternative"
                            icon={HiGlobe}
                        > {t('sidebar.blogs')}
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>

                    {/* admin - users */}
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href="#"
                            icon={HiUsers}
                        > Users
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            icon={HiCog}
                        > Settings
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            icon={HiLogout}
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
                            <Button color="gray" onClick={() => changeTheme('light')}>
                                Light
                            </Button>
                            <Button color="gray" onClick={() => changeTheme('dark')}>
                                Dark
                            </Button>
                        </Button.Group>        
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </nav>
    );
}