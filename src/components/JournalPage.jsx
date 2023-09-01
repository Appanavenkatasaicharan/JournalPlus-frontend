import React,{useEffect, useState} from 'react';
import '../styles/JournalPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CreateJournalForm from './CreateJournalForm';
import EditJournalForm from './EditJournalForm';
import axios from 'axios';
import LoadingPage from './LoadingPage';

const JournalPage = ({token}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedJournal,setSelectedJournal] = useState({})
  const [isLoading,setIsLoading] = useState(true)

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  const handleFormSubmit = (formData) => {
    setIsLoading(true)
    axios.post('http://localhost:5000/api/v1/journals',formData,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{getAllEntries()})
    .catch(err=>console.log(err))
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
    setIsLoading(true)
    axios.put(`http://localhost:5000/api/v1/journals/${selectedJournal._id}`,formData,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{getAllEntries()})
    .catch(err=>console.log(err))
    handleEditFormClose();
  };

  const deleteJournal = (journal)=>{
    setIsLoading(true)
    axios.delete(`http://localhost:5000/api/v1/journals/${journal._id}`,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{getAllEntries()})
    .catch(err=>console.log(err))
  }

  const [journalEntries,setJournalEntries] = useState([])

  const getAllEntries = ()=>{
    axios.get('http://localhost:5000/api/v1/journals',{headers:{
        Authorization : `Bearer ${token}`
      }})
      .then((res)=>{
        setIsLoading(false)
        setJournalEntries(res.data.journals)
      })
      .catch((err)=>console.log(err))
  }

  useEffect(
    ()=>{
      getAllEntries()
    },[]
  )

  return (
    isLoading?
    <LoadingPage/>:
    <div className="journal-page">
      {
      journalEntries.map((entry) => (
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
          <h2 className="entry-title">{entry.title}</h2>
          <p className="entry-description">{entry.description}</p>
          <div className="icon-container">
            <div className="icon edit-icon" onClick={()=>{handleEditFormOpen(entry)}}>
              <i className="fas fa-edit"></i> {/* FontAwesome edit icon */}
            </div>
            <div className="icon trash-icon" onClick={()=>{deleteJournal(entry)}}>
              <i className="fas fa-trash-alt"></i> {/* FontAwesome trash icon */}
            </div>
          </div>
      </div>
      ))
      
      }
      <div className="add-journal-button" onClick={handleFormOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <EditJournalForm isOpen={isEditFormOpen} onClose={handleEditFormClose} onSubmit={handleEditFormSubmit} journal={selectedJournal}/>
      <CreateJournalForm isOpen={isFormOpen} onClose={handleFormClose} onSubmit={handleFormSubmit} />
    </div>
  );
};


export default JournalPage;
