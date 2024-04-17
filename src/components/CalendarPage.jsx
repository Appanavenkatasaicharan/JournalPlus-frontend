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
import ErrorPopup from './ErrorPopup';
import _isEqual from 'lodash/isEqual'


const CalendarPage = ({token}) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState(date);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(true)
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  
    // Function to open the error popup
    const openErrorPopup = (message) => {
      setErrorMessage(message);
      setShowError(true);
    };
    // Function to close the error popup
    const closeErrorPopup = () => {
      setShowError(false);
      setErrorMessage('');
    };

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  const handleCreateEvent = (eventData) => {
    setIsLoading(true)
    axios.post(`https://journal-plus-backend.vercel.app/api/v1/calendar/events`,{...eventData,eventDate:selectedDate},{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      getAllEvents()
    })
    .catch((err)=>{
        openErrorPopup('Please provide a title.')
        setIsLoading(false)
    })
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
    axios.put(`https://journal-plus-backend.vercel.app/api/v1/calendar/events/${selectedEvent._id}`,{...eventData},{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      getAllEvents()
    })
    .catch((err)=>{
        openErrorPopup('Please provide a title.')
        setIsLoading(false)
    })
  };

  const [events,setEvents] = useState([])
  const getAllEvents = ()=>{
    axios.get(`https://journal-plus-backend.vercel.app/api/v1/calendar/events/${selectedDate.toISOString()}`,{headers:{
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
    axios.delete(`https://journal-plus-backend.vercel.app/api/v1/calendar/events/${event._id}`,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      getAllEvents()
    })
    .catch((err)=>{
        openErrorPopup('Something went wrong... Please try again')
        setIsLoading(false)
    })
  }
 
  useEffect(
    ()=>{
      getAllEvents()
    },[selectedDate]
  )

  const [tasks, setTasks] = useState([]);
  const getAllTasks = ()=>{
    axios.get('https://journal-plus-backend.vercel.app/api/v1/tasks',{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      setTasks(res.data.tasks);
    })
    .catch(err=>console.log(err))
  }
  const [deadlines, setDeadlines] = useState([]);
  const getAllDeadlines = async () => {
    try {
      // Fetch tasks first
      const tasksResponse = await axios.get('https://journal-plus-backend.vercel.app/api/v1/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const tasks = tasksResponse.data.tasks;
  
      // Then fetch deadlines
      const deadlinesResponse = await axios.get('https://journal-plus-backend.vercel.app/api/v1/calendar/deadlines', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const tempDeadlines = deadlinesResponse.data.deadlines;
  
      // Map deadlines to include associated tasks
      const newTempDeadlines = tempDeadlines.map((deadline) => {
        const associatedTask = tasks.find((task) => _isEqual(deadline.associatedTaskId, task._id));
        return { ...deadline, body: associatedTask ? associatedTask.body : '' };
      });
  
      setDeadlines(newTempDeadlines);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getAllDeadlines();
  }, []);
  

  const deleteDeadline = (deadline)=>{
    setIsLoading(true)
    axios.delete(`https://journal-plus-backend.vercel.app/api/v1/calendar/deadlines/${deadline._id}`,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      getAllDeadlines()
    })
    .catch(err=>console.log(err))
  }


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
          <h2>Events for {selectedDate.toDateString().substring(4)}</h2>
          <button className="add-event-button" onClick={handleFormOpen}>
          <FontAwesomeIcon icon={faPlus} /> Add Event
      </button>
        <EditEventForm isOpen={isEditFormOpen} onClose={handleEditFormClose} onCreate={handleEditEvent} event={selectedEvent}/>
        <CreateEventForm isOpen={isFormOpen} onClose={handleFormClose} onCreate={handleCreateEvent} />
        </div>
        <ul>
          {
          (events.length!==0)?
          events.map((event, index) => (
            <li key={index} className="event-item">
              <div className="event-icons">
                <FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={()=>deleteEvent(event)} />
                <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={()=>handleEditFormOpen(event)} />
              </div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </li>
          )):
          <h2 className="no-events-message">
          There are no events.
          </h2>
        }
        </ul>
        <div className="deadline-list">
        <h2 className="deadlines-header">
            Deadlines
          </h2>
          <ul className="deadline-items">
            {
            deadlines.length!==0?
            deadlines.map((deadline, index) => (
              <li key={index} className="deadline-item">
                <FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={()=>deleteDeadline(deadline)} />
                <h3>{deadline.body}</h3>
                <h4>{`${new Date(deadline.deadlineDate).getDate()} ${new Date(deadline.deadlineDate).toLocaleString('default', { month: 'short' })}`}</h4>
              </li>
            )):
            <h2 className="no-events-message">
          There are no upcoming deadlines.
          </h2>
            }
          </ul>
        </div>
      </div>
      <ErrorPopup showError={showError} message={errorMessage} onClose={closeErrorPopup} />
    </div>
  );
};

export default CalendarPage;
