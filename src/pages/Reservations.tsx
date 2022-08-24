import { Button, Table, ToggleSwitch } from 'flowbite-react';
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { api } from '../utilities/api';
import {
    HiTrash,
    HiCheckCircle,
    HiXCircle,
} from 'react-icons/hi';

export default function ReservationsPage() {
    const [reservations, setReservations]: any = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        getSetReservations();
    }, []);

    function getSetReservations(){
        api.get('/reservations')
            .then(res => {
                setReservations(res.data);
                setIsApproved(res.data.isApproved);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
            });
    }

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

    const handleToggleApproval = (e: any, data: any, approved: boolean) => {
        e.preventDefault();

        const newData = {
            email: data.email,
            userId: data.userId,
            tour: data.tour,
            tourId: data.tourId,
            date: data.date,
            isApproved: approved, // UPDATED
        };

        console.log(newData);

        api.put(`/reservations/${data._id}`, newData)
            .then(res => {
                getSetReservations();
                // console.log(res.data);
                
            // update
            })
            .catch(err => {
                console.log(err);
            });

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
                User
                </Table.HeadCell>
                <Table.HeadCell>
                Status
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
                                    { reservation.email }
                                </Table.Cell>
                                <Table.Cell>
 
                                    { reservation.isApproved 
                                        ? ( 
                                            
                                            <Button color='success' onClick={(e) => handleToggleApproval(e, reservation, false)} >
                                                <HiCheckCircle color='white' className="h-5 w-5" />
                                            </Button>
                                        )  : (
                                            <Button color='lightpink' onClick={(e) => handleToggleApproval(e, reservation, true)}>
                                                <HiXCircle color='red' className="h-5 w-5" />
                                            </Button>
                                        )
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