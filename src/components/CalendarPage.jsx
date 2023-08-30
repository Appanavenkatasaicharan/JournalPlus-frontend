import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarPage.css';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Example data, replace with your actual event data
  const events = [
    { title: 'Meeting', description: 'Discuss project updates' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
    { title: 'Lunch', description: 'Meet with colleagues' },
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
          <button className="add-event-button">
            <FontAwesomeIcon icon={faPlus} /> Add Event
          </button>
        </div>
        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-item">
              <div className="event-icons">
                <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                <FontAwesomeIcon icon={faEdit} className="edit-icon" />
              </div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;
