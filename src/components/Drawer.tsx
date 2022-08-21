import React, { useEffect, useState } from 'react';
// navigation
import { Link } from 'react-router-dom';
// components
import { Sidebar, Button, DarkThemeToggle, } from 'flowbite-react';
import { 
    HiChartPie, 
    HiPhotograph,
    HiCalendar,
    HiBadgeCheck,
    HiCog,
    HiLogout,
    HiUsers,
    HiDocument,
    HiChat,
    HiLocationMarker,
    HiPencilAlt,
    HiRss
} from 'react-icons/hi';
// manually import svg icons
// import adn from '../../assets/fontawesome/6.0.0/svgs/brands/adn.svg';
// i18n
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLogout } from '../hooks/useLogout';

export default function Drawer() { // props: any // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const { t } = useTranslation();
    const { logout } = useLogout();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="w-fit dark:bg-slate-700 bg-slate-200 p-2">
            <Sidebar aria-label="Default sidebar ">
                <Sidebar.Items>
                    {/* logo */}                         
                    <Sidebar.Logo
                        href="#"
                        img='/svg/vite.svg'
                        imgAlt="Flowbite logo"
                        className='mb-0'
                    >
                        <h1>{t('title')}</h1>
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
                        {/* <Link to="/logs">
                            <Sidebar.Item
                                as="span"
                                icon={HiRss}
                            >  {t('sidebar.logs')}
                            </Sidebar.Item>
                        </Link> */}
                        
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
                                icon={HiLocationMarker}
                            > {t('sidebar.tours')}
                            </Sidebar.Item>
                        </Link>

                        <Link to="/blogs">
                            <Sidebar.Item
                                as="span"
                                label="10"
                                labelColor="alternative"
                                icon={HiPencilAlt}
                            > {t('sidebar.blogs')}
                            </Sidebar.Item>
                        </Link>

                        <Link to="/pages">
                            <Sidebar.Item
                                as="span"
                                icon={HiDocument}
                                label="1"
                                labelColor="alternative"
                            > {t('sidebar.pages')}
                            </Sidebar.Item>       
                        </Link>   
                    </Sidebar.ItemGroup>

                    {/* admin - users */}
                    <Sidebar.ItemGroup>
                        
                        <Link to="/reviews">
                            <Sidebar.Item
                                as="span"
                                label="182"
                                labelColor="alternative"
                                icon={HiChat}
                            > {t('sidebar.reviews')}
                            </Sidebar.Item>
                        </Link>
                        
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
                    </Sidebar.ItemGroup>

                    {/* toggles */}
                    <Sidebar.ItemGroup>
                        <div className='flex flex-row flex-grow items-center justify-between'>
                            <Sidebar.Item
                                as="span"
                                icon={HiLogout}
                                onClick={logout}
                            > Log out
                            </Sidebar.Item>
                            
                            <DarkThemeToggle  />
                        </div>

                        <Button.Group>
                            <Button color="gray" onClick={() => changeLanguage('en')}>
                                EN
                            </Button>
                            <Button color="gray" onClick={() => changeLanguage('nl')}>
                                NL
                            </Button>
                        </Button.Group>      
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </nav>
    );
}