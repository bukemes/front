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
} from 'react-icons/hi';
// manually import svg icons
// import adn from '../../assets/fontawesome/6.0.0/svgs/brands/adn.svg';
// i18n
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLogout } from '../hooks/useLogout';
import { api } from '../utilities/api';
import {ICounters, initialCounters} from '../models/ICounters';

export default function Drawer() { // props: any // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const { t } = useTranslation();
    const { logout } = useLogout();
    const [counters, setCounters] = useState(initialCounters); // I could make a sep
    

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    function getCounters() {
        api.get('metadata/counters').then((res) => {
            setCounters(res.data as ICounters);
        }).catch((err) => {
            console.log(err);
        });
    }

    
    
    useEffect(() => {
        getCounters();
    }, []);


    return (
        <nav className="w-fit p-2 h-screen fixed">
            <Sidebar aria-label="sidebar with navigation">
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

                        {/* <Link to="/pages">
                            <Sidebar.Item
                                as="span"
                                icon={HiDocument}
                                label={counters.pages || ''}
                                labelColor="alternative"
                            > {t('sidebar.pages')}
                            </Sidebar.Item>       
                        </Link>  

                        <Link to="/blogs">
                            <Sidebar.Item
                                as="span"
                                label={counters.blogs || ''}
                                labelColor="alternative"
                                icon={HiPencilAlt}
                            > {t('sidebar.blogs')}
                            </Sidebar.Item>
                        </Link>  */}
                        
                        <Link to="/media">
                            <Sidebar.Item
                                as="span"
                                icon={HiPhotograph}
                                label={counters.media || ''}
                                labelColor="alternative"
                            > {t('sidebar.media')}
                            </Sidebar.Item>
                        </Link>

                        
                    </Sidebar.ItemGroup>

                    {/* admin - content */}
                    <Sidebar.ItemGroup>
                        <Link to="/schedule">
                            <Sidebar.Item
                                as="span"
                                icon={HiCalendar}
                                label={counters.schedules || ''}
                                labelColor="alternative"
                            > {t('sidebar.schedule')}
                            </Sidebar.Item>       
                        </Link>     

                        <Link to="/tours">
                            <Sidebar.Item
                                as="span"
                                label={counters.tours || ''}
                                labelColor="alternative"
                                icon={HiLocationMarker}
                            > {t('sidebar.tours')}
                            </Sidebar.Item>
                        </Link>

                                     
                    </Sidebar.ItemGroup>

                    {/* admin - users */}
                    <Sidebar.ItemGroup>
                        <Link to="/reservations">
                            <Sidebar.Item
                                as="span"
                                icon={HiBadgeCheck}
                                label={counters.reservations || ''}
                            > {t('sidebar.reservations')}
                            </Sidebar.Item>
                        </Link>       
                        
                        <Link to="/reviews">
                            <Sidebar.Item
                                as="span"
                                label={counters.reviews || ''}
                                labelColor="alternative"
                                icon={HiChat}
                            > {t('sidebar.reviews')}
                            </Sidebar.Item>
                        </Link>
                        
                        
                        {/* <Link to="/users">
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
                        </Link> */}
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