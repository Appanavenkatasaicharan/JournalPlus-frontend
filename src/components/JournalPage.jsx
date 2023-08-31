import React,{useState} from 'react';
import '../styles/JournalPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CreateJournalForm from './CreateJournalForm';
import EditJournalForm from './EditJournalForm';


const JournalPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedJournal,setSelectedJournal] = useState({})


  const handleFormOpen = () => {
    setIsFormOpen(true);
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  const handleFormSubmit = (formData) => {
    // Implement form submission logic here
    console.log('Form Data:', formData);
    handleFormClose();
  };


  const handleEditFormOpen = (journal) => {
    setIsEditFormOpen(true);
    setSelectedJournal(journal);
  };
  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
    setSelectedJournal({})
  };
  const handleEditFormSubmit = (formData) => {
    // Implement form submission logic here
    console.log('Form Data:', formData);
    handleEditFormClose();
  };


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
    }
  ];

  return (
    <div className="journal-page">
      {
      journalEntries.map((entry) => (
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
            <div className="icon edit-icon" onClick={()=>{handleEditFormOpen(entry)}}>
              <i className="fas fa-edit"></i> {/* FontAwesome edit icon */}
            </div>
            <div className="icon trash-icon">
              <i className="fas fa-trash-alt"></i> {/* FontAwesome trash icon */}
            </div>
          </div>
          <div className="add-journal-button" onClick={handleFormOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <EditJournalForm isOpen={isEditFormOpen} onClose={handleEditFormClose} onSubmit={handleEditFormSubmit} journal={selectedJournal}/>
      <CreateJournalForm isOpen={isFormOpen} onClose={handleFormClose} onSubmit={handleFormSubmit} />
      </div>
      ))
      }
    </div>
  );
};


export default JournalPage;
