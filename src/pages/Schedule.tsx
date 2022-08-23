import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
// multi-date picker
// import type{Value} from 'react-multi-date-picker';
import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import colors from 'react-multi-date-picker/plugins/colors';
import { Button, Card, Label, Table, TextInput } from 'flowbite-react';
import {
    HiBackspace,
    HiTrash,
} from 'react-icons/hi';
import { api } from '../utilities/api';

export default function SchedulePage() {
    const [schedules, setSchedules]: Array<any> = useState([]); 
    // import { ISchedule } from '../models/ISchedule';
    // ISchedule doesn't work, and I'm not gonna write wrapper functions to handle events
    // https://stackoverflow.com/questions/64573035/type-dispatchsetstateactionany-is-not-assignable-to-type-values-stri


    return (
        <>
            <CreateSchedule schedules={schedules} setSchedules={setSchedules} />
            <ScheduleGallery schedules={schedules} setSchedules={setSchedules} />
        </>
    );
}

function CreateSchedule({schedules, setSchedules}: any){ 
    const [dates, setDates] = useState<DateObject[] | null>(); // new Date()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const today = new Date();
    
    const handleSubmit = (e: any) => {
        e.preventDefault();

        const stringDates = dates?.map(date => {
            return date.format('YYYY-MM-DD');
        });

        stringDates?.sort();
        
        const data = {
            title,
            description,
            available: stringDates
        };

        console.log(data);

        api.post('/schedules', data)
            .then(res => {
                setSchedules([...schedules, res.data]);
            // update
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Section className="">
            {/* <h1>Schedule</h1> */}
            <Calendar className='dark:bg-gray-7a00 bg-gray-200 mr-3 mb-3'
                // range 
                weekStartDayIndex={1} // start on monday
                value={dates}
                currentDate={
                    new DateObject({ 
                        year: today.getFullYear(),
                        month: today.getMonth()+1, // Date returns 0-11, but Calendar expects 1-12
                        day: 1 // first day of the month
                    })
                }
                // fullYear // show full year
                multiple // allows selecting multiple dates
                showOtherDays // shows grayed out days of the previous/next months
                plugins={[
                    // colors({ colors: [], defaultColor: 'blue' }), // empty color array to allow colo
                    <DatePanel style={{width: '150px'}} sort="date" key={'datepanel'}/>,
                ]}
                // value={existingDates}
                onChange={setDates as any}
            />
            
            {/* Buttons & Form - Clear & Save */}
            <div className="flex flex-col justify-between mb-3">
                {/* <h1>Create new Schedule</h1> */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                            onChange={(e: any) => {setTitle(e.target.value);}}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="description"
                                value="Description"
                            />
                        </div>
                        <TextInput
                            id="description"
                            type="text"
                            onChange={(e: any) => {setDescription(e.target.value);}}
                        />
                    </div>
                    <div className='flex flex-row flex-wrap gap-2'>
                        <Button 
                            onClick={()=>setDates(null)}
                            color="failure"
                        ><HiBackspace className="h-5 w-5" />Clear</Button>

                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </Section>
    );
}

function ScheduleGallery({schedules, setSchedules}: any){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]: any = useState(null);

    function getSetSchedules(){
        api.get('/schedules')
            .then(res => {
                console.log('API:', res.data);
                setSchedules(res.data);
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
        api.delete(`schedules/${_id}`)
            .then(res => {
                const tempSchedules: Array<any> = schedules.filter((schedule: any) => {
                    return schedule._id !== _id;
                });
                setSchedules(tempSchedules);
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
            // dark:[border:1px_solid_rgb(31,41,55);]
            <Table className='w-full'>
                <Table.Head className='dark:[box-shadow:inset_0px_15px_10px_-15px_rgb(31,41,55);]'>
                    <Table.HeadCell>
                Title
                    </Table.HeadCell>
                    <Table.HeadCell>
                Description
                    </Table.HeadCell>
                    <Table.HeadCell>
                Dates
                    </Table.HeadCell>
                    <Table.HeadCell>
                        {/* Delete */}
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">        
                    {
                        // eslint-disable-next-line react/prop-types
                        schedules.map((schedule: any) => {
                            return (
                                <Table.Row key={schedule._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        { schedule.title }
                                    </Table.Cell>
                                    <Table.Cell>
                                        { schedule.title }
                                    </Table.Cell>
                                    <Table.Cell>
                                        { schedule.available.map((date: any) => {
                                            return (
                                                <div key={date}>{date}</div>
                                            );
                                        })
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button 
                                            size={'sm'}
                                            onClick={() => handleDelete(schedule._id)} 
                                            color="failure">
                                            <HiTrash className="h-5 w-5" />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })
                    }
                </Table.Body>
            </Table>
        );
    };
    return (
        <div className='mb-2'>
            {/* <h1>Schedule Gallery</h1> */}
            <Items />
        </div>
    );
}