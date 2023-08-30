import React from 'react';
import '../styles/JournalPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';


const JournalPage = () => {
  const journalEntries = [
    {
      id: 1,
      timestamp: '2023-08-30T14:30:00.000Z', // ISO string format
      title: 'First Entry',
      description: 'Today was a great day!',
      mood: 'Happy',
    },
    {
      id: 2,
      timestamp: '2023-08-29T20:15:00.000Z', // ISO string format
      title: 'Feeling Reflective',
      description: 'Spent some time thinking about the future.',
      mood: 'Excited',
    },
    {
      id: 2,
      timestamp: '2023-08-29T20:15:00.000Z', // ISO string format
      title: 'Feeling Reflective',
      description: 'Spent some time thinking about the future.',
      mood: 'Sad',
    },
    {
      id: 2,
      timestamp: '2023-08-29T20:15:00.000Z', // ISO string format
      title: 'Feeling Reflective',
      description: 'Spent some time thinking about the future.',
      mood: 'Anxious',
    },
    {
      id: 2,
      timestamp: '2023-08-29T20:15:00.000Z', // ISO string format
      title: 'Feeling Reflective',
      description: 'Spent some time thinking about the future.',
      mood: 'Depressed',
    },
    {
      id: 2,
      timestamp: '2023-08-29T20:15:00.000Z', // ISO string format
      title: 'Feeling Reflective',
      description: 'Spent some time thinking about the future.',
      mood: 'Excited',
    },
    {
      id: 2,
      timestamp: '2023-08-29T20:15:00.000Z', // ISO string format
      title: 'Feeling Reflective',
      description: 'Spent some time thinking about the future.',
      mood: 'Excited',
    },
    {
      id: 2,
      timestamp: '2023-08-29T20:15:00.000Z', // ISO string format
      title: 'Feeling Reflective',
      description: 'Spent some time thinking about the future.',
      mood: 'Excited',
    },
    {
      id: 2,
      timestamp: '2023-08-29T20:15:00.000Z', // ISO string format
      title: 'Feeling Reflective',
      description: 'Spent some time thinking about the future.',
      mood: 'Excited',
    },
    {
      id: 2,
      timestamp: '2023-08-29T20:15:00.000Z', // ISO string format
      title: 'Feeling Reflective',
      description: 'Spent some time thinking about the future.',
      mood: 'Excited',
    },
    {
      id: 2,
      timestamp: '2023-08-29T20:15:00.000Z', // ISO string format
      title: 'Feeling Reflective',
      description: 'Spent some time thinking about the future.',
      mood: 'Excited',
    }
    // Add more journal entries here
  ];

  return (
    <div className="journal-page">
      {journalEntries.map(entry => (
        <div key={entry.id} className={`journal-entry ${entry.mood}`}>
          <div className="entry-header">
            <div className="timestamp">
              <div className="date">{new Date(entry.timestamp).getDate()}</div>
              <div className="month">
                {new Date(entry.timestamp).toLocaleString('default', { month: 'short' })}
              </div>
            </div>
            <div className="mood">{entry.mood}</div>
          </div>
          <h2 className="entry-title">{entry.title}</h2>
          <p className="entry-description">{entry.description}</p>
          <div className="icon-container">
            <div className="icon edit-icon">
              <i className="fas fa-edit"></i> {/* FontAwesome edit icon */}
            </div>
            <div className="icon trash-icon">
              <i className="fas fa-trash-alt"></i> {/* FontAwesome trash icon */}
            </div>
          </div>
          <div className="create-button" onClick={() => console.log("Create clicked")}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
        </div>
      ))}
    </div>
  );
};


export default JournalPage;
