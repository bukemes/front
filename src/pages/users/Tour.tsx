import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { Overlay } from '../../components/Overlay';
import { HiClipboardCheck } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { api } from '../../utilities/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import Section from '../../components/Section';
import Footer from '../../components/Footer';
import { Badge, Button, Label, Modal, Select, Table, Textarea, TextInput } from 'flowbite-react';
import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

export default function TourPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    
    useEffect(() => {
        api.get(`/tours/public/${id}`)
            .then(res => {
                setTour(res.data);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setError(err);
                setIsLoading(false);
            });

        
    } , []);
    

    return (
        <>
            {isLoading && !error ? (
                <div>
                    loading overlay
                </div>
            ) : (
                <div className='flex-col w-screen min-h-screen'>
                    <Navigation />
                    {/* header */}
                    <TourInfo tour={tour} setIsModal={setIsModal} />
                    <CreateReservationModalSimple tour={tour} 
                        isModal={isModal} setIsModal={setIsModal} 
                    />
                    <Reviews tour={tour} />
                    <Footer />
                </div>
            )}
        </>
    );
}

function TourInfo({tour, setIsModal}: any) {
    const { t } = useTranslation();
    const { isAuthenticated } = useAuthContext();

    return (
        <>
            <header 
                id='header'
                className='flex h-4/6 relative'
                style={{
                    backgroundImage: `url(http://localhost:9002/api/img/${tour.headerImage})`,
                    backgroundSize: 'cover',

                }}
            >
                <Overlay />
                <div className="flex items-center justify-center  py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:px-6 lg:grid-cols-12 z-10">
                    <div className="place-self-center text-center mr-auto lg:col-span-7"> 
                        <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
                            { tour.i18n.map((localInfo: any) => {
                                if (localInfo.language == t('language')) {
                                    return localInfo.title;
                                }
                            })}
                        </h1>
                        <p className="mb-4">
                            { tour.i18n.map((localInfo: any) => {
                                if (localInfo.language == t('language')) {
                                    return (
                                        <span key={localInfo.language} dangerouslySetInnerHTML={{__html: localInfo.description}}></span>
                                    );
                                    // return ;
                                }
                            })}
                        </p>

                        <div className='flex gap-2 justify-center'>
                            <Badge color="info">
                            Duration in minutes: {tour.duration}
                            </Badge>
                            <Badge color="success">
                            Childfriendly
                            </Badge>
                        </div>
                        
                        <div className='flex justify-center mt-5'>
                            {isAuthenticated ? (
                                <Button onClick={() => setIsModal(true)}>
                                    Make a reservation
                                </Button>
                            ) : (
                                <Link to='/login'>
                                    <Button color='gray'>
                                        Please login to make a reservations
                                    </Button>
                                </Link>
                            )}
                        </div>
                        
                    </div>       
                         
                </div>
            </header>
        </>
        
    );
} 

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CreateReservationModal({tour, isModal, setIsModal, date, setDate, schedule, setSchedule}: any) {
    const { t } = useTranslation();
    const { isAuthenticated, user } = useAuthContext();
    const today = new Date();
    
    
   
    console.log(date);
    

    const handleCancel = () => {
        // reset values
        
        setIsModal(false);
    };
    const handleSubmit = () => {
        // process reservation
        
        setIsModal(false);
    };
    
    function includesDate(date: string){
        // console.log(date);
        const test = date.replaceAll('/', '-');
        // console.log(date, test);
        if (schedule.available.includes(test)) {
            return true;
        } else {
            return false;
        }
    }
    
    return (
        <>
            <Modal show={isModal} onClose={() => handleCancel()}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
                    <Modal.Header>
                        { t('tour.book') }
                    </Modal.Header>
                    {/* Editor */}
                    { schedule ? (
                        <Modal.Body>
                            <h3 className='mb-3'>{t('tour.selectDate')}</h3>
                            
                            <DatePicker 
                                onChange={(date) => setDate(date)}
                                value={date || ''}
                            />

                            
                        </Modal.Body>
                    ) : null}
                    {/* Buttons */}
                    <Modal.Footer>
                        <Button type="submit">
                            <HiClipboardCheck className="h-5 w-5 mr-2" />    
                            Make reservation
                        </Button>
                        <Button color="gray" onClick={() => {handleCancel();}}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

function CreateReservationModalSimple({tour, isModal, setIsModal}: any) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    const [date, setDate] = useState(0);
    const [schedule, setSchedule]: any = useState(null);
    const [available, setAvailable]: any = useState(null);
    
    useEffect(() => {
        api.get(`/schedules/${tour.schedule}`)
            .then(res => {
                setSchedule(res.data);
                setAvailable(res.data.available);      
                // setIsLoading(false);          
            }).catch(err => {
                console.log(err);
                // setError(err);
                // setIsLoading(false);
            });
    } , [tour]);
    
    const handleCancel = () => {
        // reset values
        setDate(0);
        setAvailable(null);
        setIsModal(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const data = {
            tour: tour.i18n.map((localInfo: any) => {
                if (localInfo.language == t('language')) {
                    // console.log(localInfo);
                    return localInfo.title.toString();
                }
            })[0],
            tourId: tour._id,
            date,
        };

        console.log(data);

        api.post('/reservations', data)
            .then(res => {
                console.log(res.data);
                handleCancel();
                navigate('/profile');
            // update
            })
            .catch(err => {
                console.log(err);
            });

    };
    
    return (
        <>
            <Modal show={isModal} onClose={() => handleCancel()}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
                    <Modal.Header>
                        { t('tour.book') }
                    </Modal.Header>
                    {/* Editor */}
                    { available ? (
                        <Modal.Body>
                            <div id="select-schedule">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="schedules"
                                        value={t('tour.selectDate')}
                                    />
                                </div>
                                <Select
                                    id="schedules"
                                    value={date}
                                    required={true} 
                                    onChange={(e: any) => {setDate(e.target.value);}}
                                >
                                    <option disabled value={0}>{t('admin.select')}</option>
                                    {
                                        available.map((date: any) => {
                                            return (
                                                <option key={date} value={date}>{date}</option>
                                            );
                                        })
                                    }
                                </Select>
                            </div>
                            
                            
                        </Modal.Body>
                    ) : null}
                    {/* Buttons */}
                    <Modal.Footer>
                        <Button type="submit">
                            <HiClipboardCheck className="h-5 w-5 mr-2" />    
                            Make reservation
                        </Button>
                        <Button color="gray" onClick={() => {handleCancel();}}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

function Reviews({tour}: any) {
    const { t } = useTranslation();
    const { isAuthenticated, user } = useAuthContext();

    const [isShowing, setIsShowing] = useState(true);
    const [review, setReview] = useState(''); // singular, new
    const [reviews, setReviews]: any = useState(); // plural, old

    useEffect(() => {
        api.get(`/reviews/${tour._id}`)
            .then(res => {
                setReviews(res.data);
            }).catch(err => {
                console.log(err);
            });
    } , [tour]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const data = {
            tourId: tour._id,
            text: review
        };

        // console.log(data);
        api.post('/reviews', data)
            .then(res => {
                // const tempRev: Array<any> = 
                // setReview('');
                // navigate('/profile');
            // update
            })
            .catch(err => {
                console.log(err);
            });

    };
    
    return (
        <Section className='flex-col'> 
            {
                isAuthenticated ? (
                    <Button onClick={() => setIsShowing(true)}>
                            Create Review 
                    </Button>
                ) : null
            }

            {
                isShowing ? (
                    <form className='mt-5 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <Textarea
                            value={review}
                            id="review"
                            placeholder="Leave a review..."
                            required={true}
                            rows={4}
                            onChange={(e: any) => setReview(e.target.value)}
                        />
                        <div className='flex gap-2'>
                            <Button type="submit">Post Review</Button>
                            <Button color="gray" onClick={() => setIsShowing(false)}>Cancel</Button>
                        </div>
                    </form>
                ) : null
            }

            {
                reviews ? (
                    <Table className='w-full mt-5'>
                        <Table.Head className='dark:[box-shadow:inset_0px_15px_10px_-15px_rgb(31,41,55);]'>
                            <Table.HeadCell>
                                                    Reviews
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">        
                            {
                                // eslint-disable-next-line react/prop-types
                                reviews.map((review: any) => {
                                    return (
                                        <Table.Row key={review._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                <span className='text-gray-400 text-sm'>{ review.email} </span>
                                                <p>{ review.text }</p>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })
                            }
                        </Table.Body>
                    </Table>
                ) : null
            }
        </Section>
    );
}

// function ShowReviews() {

// }