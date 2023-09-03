import React,{useEffect, useState} from 'react';
import '../styles/JournalPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CreateJournalForm from './CreateJournalForm';
import EditJournalForm from './EditJournalForm';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import ErrorPopup from './ErrorPopup';

const JournalPage = ({token}) => {
  const [isFormOpen, setIsFormOpen] = useState(false); // For handling when to create creation form.
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // For deciding when to open edit form
  const [selectedJournal,setSelectedJournal] = useState({}) // To track the specific journal that is being edited or deleted
  const [isLoading,setIsLoading] = useState(true) // To toggle loading screen
  const [showError, setShowError] = useState(false); // To show error popup.
  const [errorMessage, setErrorMessage] = useState(''); // Message for the error popup

  
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


  // Opening creation form
  const handleFormOpen = () => {
    setIsFormOpen(true);
  };
  // Closing creation form
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  // When the data in creation form is submitted.
  const handleFormSubmit = (formData) => {
    setIsLoading(true)
    axios.post('http://localhost:5000/api/v1/journals',formData,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{getAllEntries()})
    .catch(err=>{
      openErrorPopup('You need to provide a title')
      setIsLoading(false)
    })
    handleFormClose();
  };


  // Opening Edit form
  const handleEditFormOpen = (journal) => {
    setIsEditFormOpen(true);
    setSelectedJournal(journal);
  };
  // Closing edit form
  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
    setSelectedJournal({})
  };
  // When edit form is submitted
  const handleEditFormSubmit = (formData) => {
    setIsLoading(true)
    axios.put(`http://localhost:5000/api/v1/journals/${selectedJournal._id}`,formData,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{getAllEntries()})
    .catch(err=>{
      openErrorPopup('You need to provide a title')
      setIsLoading(false)
    })
    handleEditFormClose();
  };

  // Delete a journal
  const deleteJournal = (journal)=>{
    setIsLoading(true)
    axios.delete(`http://localhost:5000/api/v1/journals/${journal._id}`,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{getAllEntries()})
    .catch(err=>{
      openErrorPopup('Something went wrong.... Please try again.')
      setIsLoading(false)
    })
  }

  // Initial loading
  const [journalEntries,setJournalEntries] = useState([])
  const getAllEntries = ()=>{
    axios.get('http://localhost:5000/api/v1/journals',{headers:{
        Authorization : `Bearer ${token}`
      }})
      .then((res)=>{
        setIsLoading(false)
        setJournalEntries(res.data.journals)
      })
      .catch((err)=>{
        openErrorPopup('Something went wrong.... Please try again.')
        setIsLoading(false)
      })
  }
  // Will run only once to load the journals during the initial load
  useEffect(
    ()=>{
      getAllEntries()
    },[]
  )

  return (
    isLoading? // Boolean to decide whether to display loading screen or not.
    <LoadingPage/>:
    <div className="journal-page">
      {
      (journalEntries.length!==0)?
      journalEntries.map((entry) => (
        // Each journal element is rendered with map function
        <div key={entry._id} className={`journal-entry ${entry.mood}`}>
          <div className="entry-header">
            <div className="timestamp">
              <div className="date">{new Date(entry.creationDate).getDate()}</div>
              <div className="month">
                {new Date(entry.creationDate).toLocaleString('default', { month: 'short' })}
              </div>
            </div>
            <div className="mood">{entry.mood}</div>
          </div>
          <h2 className={`entry-title ${entry.mood}`}>{entry.title}</h2>
          <p className={`entry-description ${entry.mood}`}>{entry.description}</p>
          <div className="icon-container">
            <div className="icon edit-icon" onClick={()=>{handleEditFormOpen(entry)}}>
              <i className="fas fa-edit"></i> {/*  edit button */}
            </div>
            <div className="icon trash-icon" onClick={()=>{deleteJournal(entry)}}>
              <i className="fas fa-trash-alt"></i> {/*  delete button */}
            </div>
          </div>
      </div>
      // End of journal element
      )):
      // This is rendered when there are no journals.
      <h2 class="no-message">
          There are no Journals.
      </h2>
      }
      <div className="add-journal-button" onClick={handleFormOpen}>
        <FontAwesomeIcon icon={faPlus} /> {/* Create button */}
      </div>
      <EditJournalForm isOpen={isEditFormOpen} onClose={handleEditFormClose} onSubmit={handleEditFormSubmit} journal={selectedJournal}/>{/*Edit form */}
      <CreateJournalForm isOpen={isFormOpen} onClose={handleFormClose} onSubmit={handleFormSubmit} />{/*create form */}
      <ErrorPopup showError={showError} message={errorMessage} onClose={closeErrorPopup} />{/*Error popup */}
    </div>
  );
};

export default JournalPage;
