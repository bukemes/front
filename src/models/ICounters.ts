// import { api } from '../utilities/api';

export interface ICounters {
    media?: string; 
    reservations?: string;
    schedules?: string;
    tours?: string;
    blogs?: string;
    pages?: string;
    reviews?: string;
    users?: string;
}

export const initialCounters: ICounters = {
    media: '0',
    reservations: '0',
    schedules: '0',
    tours: '0',
    blogs: '0',
    pages: '0',
    reviews: '0',
    users: '0',
};

// export async function getCounters() {
//     api.get('metadata/counters').then((res: any) => {
//         return res.data as ICounters;
//     }).catch((err) => {
//         console.log(err);
//         return {};
//     });
// }
