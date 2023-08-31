import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarPage.css';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import CreateEventForm from './CreateEventForm';
import EditEventForm from './EditEventForm';


const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);


  const handleFormOpen = () => {
    setIsFormOpen(true);
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  const handleCreateEvent = (eventData) => {
    // Implement event creation logic here
    console.log('Event Data:', eventData);
  };


  const handleEditFormOpen = (event) => {
    setIsEditFormOpen(true);
    setSelectedEvent(event)
  };
  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
  };
  const handleEditEvent = (eventData) => {
    // Implement event creation logic here
    console.log('Event Data:', eventData);
  };


  // Example data, replace with your actual event data
  const events = [
    { title: 'Meeting', description: 'Discuss project updates' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    // ...
  ];

  const deadlines = [
    { title: 'Project Deadline', time: '5:00 PM' },
    { title: 'Assignment Due', time: '11:59 PM' },
    // ...
  ];


  return (
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
                <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={()=>handleEditFormOpen(event)} />
              </div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
        <div className="deadline-list">
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
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
