// import React, { useState, useRef } from 'react';
// import Section from '../components/Section';
// // multi-date picker
// import type{Value} from 'react-multi-date-picker';
// import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker';
// import DatePanel from 'react-multi-date-picker/plugins/date_panel';
// import colors from 'react-multi-date-picker/plugins/colors';

export default function TourPage() {
    console.log('TourPage');
    //     const [dates, setDates] = useState<DateObject | DateObject[] | null>(); // new Date()

    //     const existingDates = [new Date('2022-08-16'), new Date('2022-08-17')];
    
    //     // console.log(existingDates);
    //     // const calendarRef = useRef();
    //     // const today = new Date();
    //     // const tomorrow = new Date();
    //     // new Date();
    //     // tomorrow.setDate(tomorrow.getDate() + 1);
    //     // const [values, setValues] = useState([today, tomorrow]);
    
    //     // consts
    //     const today = new Date();

    //     // 
    //     if(dates && dates instanceof Array<DateObject>) {
    //         const formattedDateArray: any= [];
    //         dates.forEach(date => {
    //             formattedDateArray.push(date.format('YYYY-MM-DD'));
    //         });
    //         console.log(formattedDateArray);
    //         // dates.map(date => {
    //         //     console.log(date.date);
    //         // });
    //         // console.log(dates[0].format('YYYY-MM-DD'));
    //     }
    //     // console.log(dates);

    //     // COLORED DATES
    //     const dateobj = [new DateObject('2022-11-11'), new DateObject('2022-12-12')];
    //     dateobj.forEach((date: any)=> {
    //         date.color = 'green';
    //     });
    //     // value={dateobj} //prop


    //     return (
    //         <Section>
    //             {/* <h1>Schedule</h1> */}
    //             <Calendar 
    //                 // range
    //                 value={dateobj} // prop
                
    //                 currentDate={
    //                     new DateObject({ 
    //                         year: today.getFullYear(),
    //                         month: today.getMonth()+1, // Date returns 0-11, but Calendar expects 1-12
    //                         day: 1 // first day of the month
    //                     })
    //                 }
    //                 // fullYear // show full year
    //                 multiple // allows selecting multiple dates
    //                 showOtherDays // shows grayed out days of the previous/next months
    //                 plugins={[
    //                     colors({ colors: [], defaultColor: 'blue' }), // empty color array to allow colo
    //                     <DatePanel style={{width: '150px'}} sort="date" key={'datepanel'}/>,
    //                 ]}
    //                 // value={existingDates}
    //                 // onChange={setDates}
    //                 // mapDays={(e) => {
    //                 //     e.isSameDate(e.date, existingDates2[0].date) ? e.color = 'green' : e.color = 'blue';
    //                 //     // console.log(e.date.toString());
    //                 //     if(existingDates.includes(e.date.toString())){
    //                 //         return {
    //                 //             style: {
    //                 //                 backgroundColor: 'brown',
    //                 //                 color: 'white'
    //                 //             }
    //                 //         };}
                        
//                 // }}
//             />
//         </Section>
//     );
}