import React, { useEffect, useState } from 'react';
// components
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Overlay } from '../../components/Overlay';
// i18n
// import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { HiArrowDown } from 'react-icons/hi';
import { api } from '../../utilities/api';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function HomePage() {
    const { t } = useTranslation();
    
    return (
        <>
            <div className='flex-col w-screen'>
                <Navigation />

                {/* header */}
                <header 
                    id='header'
                    className='flex h-screen '
                    style={{
                        backgroundImage: 'url(/img/header.jpg)',
                        backgroundSize: 'cover',
                    }}
                >
                    <Overlay />

                    <div className="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:px-6 lg:grid-cols-12 z-10">
                        <div className="place-self-center mr-auto lg:col-span-7">                    
                            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
                                {t('home.header.tagline')}
                            </h1>
                            <p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                                {t('home.header.description')}
                            </p>

                            <a href="#tours" 
                                className="inline-flex justify-center items-center
                                px-5 py-3 bg-blue-600 text-white rounded-lg
                                hover:bg-blue-800 mr-10">
                                {t('home.header.tours')} <HiArrowDown className='ml-3' />
                            </a>
                            <a href="#about" className="inline-flex justify-center items-center
                                px-5 py-3 dark:text-white text-black
                                hover:text-gray-900 hover:underline mr-10">
                                {t('home.header.about')} <HiArrowDown className='ml-3' />

                                {/* px-2 py-2 bg-blue-600 text-white */}
                            </a> 
                        </div>
                        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                            {/* <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" /> */}
                        </div>                
                    </div>
                </header>

                {/* about */}
                <section id='about' className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                            {t('home.about.title')}
                        </h2>
                        <p className="mb-4">{t('home.about.tagline')}</p>
                        <p>{t('home.about.description')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img className="w-full rounded-lg" src="/img/about1.jpg" alt="office content 1" />
                        <img className="mt-4 w-full rounded-lg lg:mt-10" src="/img/about2.jpg" alt="office content 2" />
                    </div>
                </section>
                {/* <section>blogs</section> */}

                <section id='tours'  className="dark:bg-slate-600 bg-slate-300 items-center py-8 px-4 mx-auto lg:py-16 lg:px-6">
                    <div className='flex flex-col justify-center items-center'>
                        <div id='tour-intro' className="flex flex-col justify-center items-center text-center font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                                {t('home.tours.title')}
                            </h2>
                            <p className="mb-4">{t('home.tours.tagline')} {<br/>} {t('home.tours.description')}</p>
                            <p></p>
                        </div>

                        <TourCards />
                    </div>    
                </section>
                <section id='contact' className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                            {t('home.contact.title')}
                        </h2>
                        <p className="mb-4">{t('home.contact.tagline')}</p>
                        <p>{t('home.contact.description')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <a href="#">
                            <img className="w-full rounded-lg" src="/img/contact1.jpg" alt="office content 1" />
                        </a>
                        <a href="#">
                            <img className="mt-4 w-full rounded-lg lg:mt-10" src="/img/contact2.jpg" alt="office content 2" />
                        </a>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}


function TourCards() {
    const [tours, setTours]: any = useState(null);
    const baseURL = 'http://localhost:9002/api/img/';
    const { isAuthenticated } = useAuthContext();
    const { t } = useTranslation();

    useEffect(() => {
        api.get('/tours/public')
            .then(res => {
                setTours(res.data);
            }).catch(err => {
                console.log(err);
            });
    }, []);
    
    return (
        <div className='flex flex-wrap flex-row gap-10 justify-center'>
            {
                // eslint-disable-next-line react/prop-types
                tours && tours.map((tour: any) => {
                    return (
                        <div key={tour._id} className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 max-h-min">
                            <img style={{
                                // height:'50%',
                                height:'300px',
                                width: '100%',
                                objectFit:'cover'
                            }} className="rounded-t-lg h-6/12" src={`${baseURL}${tour.headerImage}`} alt="" />

                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        { tour.i18n.map((localInfo: any) => {
                                            if (localInfo.language == t('language')) {
                                                return localInfo.title;
                                            }
                                        })}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    { tour.i18n.map((localInfo: any) => {
                                        if (localInfo.language == t('language')) {
                                            return localInfo.description;
                                        }
                                    })}
                                </p>
                                <Link to={`/tours/${tour._id}`} className="mr-2 inline-flex items-center py-2 px-3 text-sm font-medium text-center dark:text-white text-gray-600 hover:text-blue-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Learn more <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </Link>

                                {
                                    isAuthenticated ? (
                                        <Link to={`/tours/${tour._id}`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Book <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </Link>
                                    ) : (
                                        <Link to='/login'  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Book <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </Link>
                                    )
                                }
                                
                            </div>
                        </div>
                    );
                })

            }
        </div>
    );
}