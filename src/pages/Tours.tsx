import React, { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Label, Modal, Select, Table, Tabs, TextInput } from 'flowbite-react';
import {
    HiBackspace,
    HiTrash,
    HiCheckCircle,
    HiXCircle,
    HiPencil,
    HiPencilAlt,
    HiSave,
} from 'react-icons/hi';
import { api } from '../utilities/api';
import Section from '../components/Section';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ICustomError from '../models/ICustomError';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';


export default function ToursPage() {
    const [tours, setTours]: Array<any> = useState([]);
    const [schedules, setSchedules]: Array<any> = useState([]); 
    const [images, setImages]: Array<any> = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const [isModal, setIsModal] = useState(false);
    const [tour, setTour] = useState(null); // tour to edit

    function getSetSchedules(){
        api.get('/schedules')
            .then(res => {
                setSchedules(res.data);
            }).catch(err => {
                console.log(err);
                setError(err.data);
            });
    }

    function getSetImages(){
        api.get('/media')
            .then(res => {
                setImages(res.data);
            }).catch(err => {
                console.log(err);
                setError(err.data);
            });
    }

    useEffect(() => {
        setIsLoading(true);
        getSetSchedules();
        getSetImages();
        setIsLoading(false);
    } , []);

    return (
        <>
            <Section>
                <Button 
                    onClick={() => setIsModal(true)}>
                    <HiPencilAlt />
                    Create  Tour
                </Button>
            </Section>
            {/* really, should be reworked to a TourContext, but time */}
            <TourModal
                tour={tour} setTour={setTour}
                tours={tours} setTours={setTours} 
                schedules={schedules} setSchedules={setSchedules} 
                images={images} setImages={setImages}
                error={error} setError={setError}
                isLoading={isLoading} setIsLoading={setIsLoading}
                isModal={isModal} setIsModal={setIsModal} 
            />
            <TourGallery  
                setTour={setTour}
                tours={tours} setTours={setTours} 
                schedules={schedules} setSchedules={setSchedules} 
                error={error} setError={setError}
                isLoading={isLoading} setIsLoading={setIsLoading}
                isModal={isModal} setIsModal={setIsModal} 
            />
        </>
    );
}

function TourGallery({
    setTour,
    tours, setTours, 
    schedules, setSchedules, 
    error, setError,
    isLoading, setIsLoading,
    isModal, setIsModal }: any){
    // function start
    const { t } = useTranslation();

    function getSetSchedules(){
        api.get('/tours')
            .then(res => {
                setTours(res.data);
            }).catch(err => {
                console.log(err);
                setError(err.data);
            });
    }

    useEffect(() => {
        getSetSchedules();
    } , []);

    const handleDelete = (_id: string) => {
        setIsLoading(true);
        api.delete(`tours/${_id}`)
            .then(res => {
                const tempTours: Array<any> = tours.filter((tour: any) => {
                    return tour._id !== _id;
                });
                setTours(tempTours);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setError(err.data);
                setIsLoading(false);
            }
            );
    };

    const Items = () => {
        return (
            <Table className='w-full'>
                <Table.Head className='dark:[box-shadow:inset_0px_15px_10px_-15px_rgb(31,41,55);]'>
                    <Table.HeadCell>
                    Title
                    </Table.HeadCell>
                    <Table.HeadCell>
                    Duration
                    </Table.HeadCell>
                    <Table.HeadCell>
                    Public
                    </Table.HeadCell>
                    <Table.HeadCell>
                    Schedule
                    </Table.HeadCell>
                    <Table.HeadCell>
                        {/* Delete */}
                    </Table.HeadCell>
                </Table.Head>
                {i18n.language ? (
                    <Table.Body className="divide-y">        
                        {
                            // eslint-disable-next-line react/prop-types
                            tours.map((tour: any) => {
                                return (
                                    <Table.Row key={tour._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            { tour.i18n.map((localInfo: any) => {
                                                // console.log(localInfo);
                                                // return JSON.stringify(localInfo);
                                                if (localInfo.language == t('language')) {
                                                    return localInfo.title;
                                                }
                                            })}
                                        </Table.Cell>
                                        <Table.Cell>
                                            { tour.duration }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                tour.isPublished 
                                                    ? (<HiCheckCircle color='green' className="h-5 w-5" />) 
                                                    : (<HiXCircle color='red' className="h-5 w-5" />)
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            { 
                                                // eslint-disable-next-line react/prop-types
                                                schedules.map((schedule: any) => {
                                                    if (schedule._id === tour.schedule) {
                                                        return schedule.title;
                                                    }
                                                })
                                            }
                                        </Table.Cell>
                                        <Table.Cell className='flex gap-2'>
                                            <Button 
                                                size={'sm'}
                                                onClick={() => {
                                                    setTour(tour);
                                                    setIsModal(true);
                                                }} 
                                                color="info">
                                                <HiPencil className="h-5 w-5" />
                                            </Button>
                                            <Button 
                                                size={'sm'}
                                                onClick={() => handleDelete(tour._id)} 
                                                color="failure">
                                                <HiTrash className="h-5 w-5" />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })
                        }
                    </Table.Body>
                ): null}
                
            </Table>
        );
    };

    return (
        <div className='mb-2'>
            <Items />
        </div>
    );
}

function TourModal({
    tour, setTour, // used to (re)set whether the modal is in create or edit mode + populate if edit
    tours, setTours, 
    schedules, setSchedules, 
    images, setImages,
    error, setError,
    isLoading, setIsLoading,
    isModal, setIsModal,
}: any) {
    // const [localizedTourInfo, setLocalizedTourInfo] = useState({});
    // should be refactored into a single locale object, with the properties set by the i18n lang key
    const [titleEN, setTitleEN] = useState('');
    const [descriptionEN, setDescriptionEN] = useState('');
    // nl
    const [titleNL, setTitleNL] = useState('');
    const [descriptionNL, setDescriptionNL] = useState('');
    // general
    const [schedule, setSchedule] = useState(0); // default schedule //
    const [image, setImage] = useState(0); // default schedule
    const [isPublished, setIsPublished] = useState(false);
    const [duration, setDuration] = useState(60);

    const { t } = useTranslation();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const en = {
            language: 'en',
            title: titleEN,
            description: descriptionEN,
        };

        const nl = {
            language: 'nl',
            title: titleNL,
            description: descriptionNL,
        };

        const data = {
            isPublished,
            i18n:[en, nl],
            headerImage: image,
            schedule,
            duration
        };

        if(!tour){
            api.post('tours', data)
                .then(res => {
                    console.log(res.data);
                    setTours([...tours, res.data]);
                })
                .catch(err => {
                    setError(err.data);
                    console.log(err);
                }  
                );
        }

        if(tour){
            api.put(`tours/${tour._id}`, data)
                .then(res => {
                    console.log(res.data);
                    // setTours([...tours, res.data]);
                })
                .catch(err => {
                    setError(err.data);
                    console.log(err);
                }  
                );
        }
        
    };

    const handleCancel = () => {
        setIsModal(false);
        setTour(null);
        // reset values
        setTitleEN('');
        setDescriptionEN('');
        setTitleNL('');
        setDescriptionNL('');
        setSchedule(0);
        setImage(0);
        setIsPublished(false);
        setDuration(0);
    };

    const handleClear = () => {
        setTitleEN('');
        setDescriptionEN('');
        setTitleNL('');
        setDescriptionNL('');
        setSchedule(0);
        setImage(0);
        setIsPublished(false);
        setDuration(0);
    };

    useEffect(() => {
        if(tour){
            setTitleEN(tour.i18n.find((localInfo: any) => {
                return localInfo.language == 'en';
            }).title);
            setDescriptionEN(tour.i18n.find((localInfo: any) => {
                return localInfo.language == 'en';
            }).descriptionEN);
            setTitleNL(tour.i18n.find((localInfo: any) => {
                return localInfo.language == 'nl';
            }).title);
            setDescriptionNL(tour.i18n.find((localInfo: any) => {
                return localInfo.language == 'nl';
            }).descriptionNL);
            setSchedule(tour.schedule);
            setImage(tour.headerImage);
            setIsPublished(tour.isPublished);
            setDuration(tour.duration);
        }
    } , [tour]);

    return (
        <Modal show={isModal} onClose={() => handleCancel()} >
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
                <Modal.Header>
                    { tour ? t('tours.edit') : t('tours.create') }
                </Modal.Header>
                {/* Editor */}
                <Modal.Body>
                    {/* i18n */}
                    <Tabs.Group
                        aria-label="Default tabs"
                        style="default"
                    >
                        <Tabs.Item title="en" active={true} >
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="title"
                                        value="Title"
                                    />
                                </div>
                                <TextInput
                                    id="title"
                                    type="text"
                                    required={true}
                                    value={titleEN}
                                    onChange={(e: any) => {setTitleEN(e.target.value);}}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="description"
                                        value="Description"
                                    />
                                </div>
                                <ReactQuill id='description' theme="snow" value={descriptionEN} onChange={setDescriptionEN} />
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="nl">
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="title"
                                        value="Title"
                                    />
                                </div>
                                <TextInput
                                    id="title"
                                    type="text"
                                    value={titleNL}
                                    onChange={(e: any) => {setTitleNL(e.target.value);}}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="description"
                                        value="Description"
                                    />
                                </div>
                                <ReactQuill id='description' theme="snow" value={descriptionNL} onChange={setDescriptionNL} />
                            </div>
                        </Tabs.Item>
                    </Tabs.Group>

                    {/* schedule */}
                    <div id="select-schedule">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="schedules"
                                value={t('admin.selectschedule')}
                            />
                        </div>
                        <Select
                            id="schedules"
                            value={schedule}
                            required={true} 
                            onChange={(e: any) => {setSchedule(e.target.value);}}
                        >
                            <option disabled value={0}>{t('admin.select')}</option>
                            {
                                schedules.map((schedule: any) => {
                                    return (
                                        <option key={schedule._id} value={schedule._id}>{schedule.title}</option>
                                    );
                                })
                            }
                        </Select>
                    </div>

                    {/* images */}
                    <div id="select-image">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="images"
                                value={t('admin.selectimage')}
                            />
                        </div>
                        <Select
                            id="images"
                            value={image}
                            required={true} 
                            onChange={(e: any) => {
                                if(e.target.value !== 0) {
                                    setImage(e.target.value);
                                }
                            }}
                        >
                            <option disabled value={0}>{t('admin.select')}</option>
                            {
                                images.map((image: any) => {
                                    return (
                                        // console.log(image)
                                        <option key={image._id} value={image.filename}>{image.title}</option>
                                    );
                                })
                            }
                        </Select>
                    </div>
                    
                    {/* duration */}
                    <div className='mb-3'>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="duration"
                                value="Duration"
                            />
                        </div>
                        <TextInput
                            id="duration"
                            type="number"
                            required={true}
                            value={duration}
                            onChange={(e: any) => {setDuration(e.target.value);}}
                        />
                    </div>

                    {/* publish */}
                    <div className="flex items-center gap-2">
                        <Checkbox id="agree" 
                            checked={isPublished}
                            onChange={e => e.target.checked ? setIsPublished(true) : setIsPublished(false)}
                        />
                        <Label htmlFor="agree">
                        Publish
                        </Label>

    
                    </div>            
                </Modal.Body>
                {/* Buttons */}
                <Modal.Footer>
                    <Button color="failure" onClick={() => {handleClear();}}>
                        <HiBackspace className="h-5 w-5 mr-2" />
                        Clear
                    </Button>
                    <Button type="submit">
                        <HiSave className="h-5 w-5 mr-2" />    
                        { tour ? t('tours.update') : t('tours.save') }
                    </Button>
                    <Button color="gray" onClick={() => {handleCancel();}}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}


   