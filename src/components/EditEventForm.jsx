import React, { useState } from 'react';
import '../styles/CreateEventForm.css';

const EditEventForm = ({ isOpen, onClose, onCreate, event}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call the onCreate function and pass the event data
    onCreate({ title, description });
    // Clear form fields
    setTitle('');
    setDescription('');
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
            value={event.title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={event.description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="form-buttons">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;
