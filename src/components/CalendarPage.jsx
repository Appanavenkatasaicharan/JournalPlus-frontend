import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarPage.css';

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import CreateEventForm from './CreateEventForm';
import EditEventForm from './EditEventForm';
import LoadingPage from './LoadingPage';
import axios from 'axios';


const CalendarPage = ({token}) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState(date);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(true)


  const handleFormOpen = () => {
    setIsFormOpen(true);
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  const handleCreateEvent = (eventData) => {
    setIsLoading(true)
    axios.post(`http://localhost:5000/api/v1/calendar/events`,{...eventData,eventDate:selectedDate},{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      getAllEvents()
    })
    .catch((err)=>console.log(err))
  };


  const handleEditFormOpen = (event) => {
    setIsEditFormOpen(true);
    setSelectedEvent(event)
  };
  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
  };
  const handleEditEvent = (eventData) => {
    setIsLoading(true)
    axios.put(`http://localhost:5000/api/v1/calendar/events/${selectedEvent._id}`,{...eventData},{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      getAllEvents()
    })
    .catch((err)=>console.log(err))
  };

  const [events,setEvents] = useState([])
  const getAllEvents = ()=>{
    axios.get(`http://localhost:5000/api/v1/calendar/events/${selectedDate.toISOString()}`,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      setEvents(res.data.events)
      setIsLoading(false)
    })
    .catch((err)=>console.log(err))
  }

  const deleteEvent = (event)=>{
    setIsLoading(true)
    axios.delete(`http://localhost:5000/api/v1/calendar/events/${event._id}`,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      getAllEvents()
    })
    .catch((err)=>console.log(err))
  }
 
  useEffect(
    ()=>{
      getAllEvents()
    },[selectedDate]
  )

  const [deadlines,setDeadlines] = useState([])
  // const getAllDeadlines = ()=>{
  //   axios.get(`http://localhost:5000/api/v1/calendar/deadlines/${selectedDate.toISOString()}`,{headers:{
  //     Authorization : `Bearer ${token}`
  //   }})
  //   .then((res)=>{
  //     setDeadlines(res.data.events)
  //   })
  //   .catch((err)=>console.log(err))
  // }
 
  // useEffect(
  //   ()=>{
  //     getAllDeadlines()
  //   },[]
  // )


  return (
    (isLoading)?
    <LoadingPage />:
    <div className="calendar-page">
      <div className="calendar-container">
        <Calendar
          value={selectedDate}
          onChange={date => setSelectedDate(date)}
          className="custom-calendar"
        />
      </div>
      <div className="event-list">
        <div className="event-list-header">
          <h2>Events for {selectedDate.toDateString()}</h2>
          <button className="add-event-button" onClick={handleFormOpen}>
          <FontAwesomeIcon icon={faPlus} /> Add Event
      </button>
        <EditEventForm isOpen={isEditFormOpen} onClose={handleEditFormClose} onCreate={handleEditEvent} event={selectedEvent}/>
        <CreateEventForm isOpen={isFormOpen} onClose={handleFormClose} onCreate={handleCreateEvent} />
        </div>
        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-item">
              <div className="event-icons">
                <FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={()=>deleteEvent(event)} />
                <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={()=>handleEditFormOpen(event)} />
              </div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
        {/* <div className="deadline-list">
        <h2 className="deadlines-header">
            Deadlines
          </h2>
          <ul className="deadline-items">
            {deadlines.map((deadline, index) => (
              <li key={index} className="deadline-item">
                <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                <h3>{deadline.title}</h3>
                <p>Time: {deadline.time}</p>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default CalendarPage;
