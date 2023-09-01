import React, { useEffect, useState } from 'react';
import '../styles/CreateEventForm.css';

const EditEventForm = ({ isOpen, onClose, onCreate, event}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(
    ()=>{
      setTitle(event.title);
      setDescription(event.description);
    },[event]
  )

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, description });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-form">
      <div className="form-container">
        <h2 className="form-heading">Edit Event</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="form-buttons">
            <button type="submit">Edit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;
