import { Button, Table } from 'flowbite-react';
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { api } from '../../utilities/api';
import {
    HiTrash,
    HiCheckCircle,
    HiXCircle,
} from 'react-icons/hi';

export default function ProfilePage() {
    return (
        <>
            <div className='flex-col w-screen'>
                <Navigation />
                
                <Reservations  />
            </div>
            
        </>
    );
}

export function Reservations() {
    const [reservations, setReservations]: any = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get('/reservations/user')
            .then(res => {
                setReservations(res.data);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (_id: string) => {
        setIsLoading(true);
        api.delete(`reservations/${_id}`)
            .then(res => {
                const tempRes: Array<any> = reservations.filter((reservation: any) => {
                    return reservation._id !== _id;
                });
                setReservations(tempRes);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setReservations(err.data);
                setIsLoading(false);
            }
            );
    };

    return (
        <Table className='w-full mt-5'>
            <Table.Head className='dark:[box-shadow:inset_0px_15px_10px_-15px_rgb(31,41,55);]'>
                <Table.HeadCell>
                Tour
                </Table.HeadCell>
                <Table.HeadCell>
                Date
                </Table.HeadCell>
                <Table.HeadCell>
                Approved
                </Table.HeadCell>
                <Table.HeadCell>
                    {/* Delete */}
                </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">        
                {
                    // eslint-disable-next-line react/prop-types
                    reservations.map((reservation: any) => {
                        return (
                            <Table.Row key={reservation._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    { reservation.tour }
                                </Table.Cell>
                                <Table.Cell>
                                    { reservation.date }
                                </Table.Cell>
                                <Table.Cell>
                                    { reservation.isApproved 
                                        ? (<HiCheckCircle color='green' className="h-5 w-5" />) 
                                        : (<HiXCircle color='red' className="h-5 w-5" />)
                                    }
                                </Table.Cell>
                                <Table.Cell>
                                    <Button 
                                        size={'sm'}
                                        onClick={() => handleDelete(reservation._id)} 
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
}