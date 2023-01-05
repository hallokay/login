import React , {useEffect, useState} from 'react'
import {Events} from '../data/events'
// big calendar
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    // "ko": require('date-fns/locale/ko')
    "en-US": require("date-fns/locale/en-US"),
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2022, 12, 0),
//         end: new Date(2022, 12, 0),
//     },
//     {
//         title: "Vacation",
//         start: new Date(2022, 12, 7),
//         end: new Date(2022,12, 10),
//     },
//     {
//         title: "Conference",
//         start: new Date(2022, 12, 20),
//         end: new Date(2022, 12, 23),
//     },
// ];
const BigCalendar = () => {
const [event, setEvent] = useState({
        title: '',
        start: '',
        end: ''
    });
const [allEvents, setAllEvents] = useState(Events);

function handleEvent ( ) {

  setAllEvents({...allEvents, event});

}
// useEffect(()=> {
//   console.log(event);
//   console.log(setEvent);
// },[])

  return (
    <>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input 
          type="text"
          placeholder='Add title'
          style={{ width: '20px', marginRight: '20px' }}
          value={event.title}
          onChange={(e) => setEvent({...event, title: e.target.value})}
          />
          <DatePicker
            placeholder="Start Date" 
            style={{marginRight: '10px',zIndex: 999}}
            selected={event.start}
            onChange={(start) => setEvent({...event, start})}            
            />
          <DatePicker
            placeholder="End Date" 
            style={{marginRight: '10px', zIndex: 999}}
            selected={event.end}
            onChange={(end) => setEvent({...event, end})}            
            />
            <button style={{marginTop: '10px'}} onClick={handleEvent}>Add Event</button>
      </div>
      <Calendar 
        localizer={localizer} 
        events={allEvents}  
        startAccessor="start" 
        endAccessor="end"
        style={{height: 500, margin: '50px', zIndex:-1}}
        />
    </>
  ) 
}

export default BigCalendar