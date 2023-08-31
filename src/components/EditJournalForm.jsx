import React, { useState } from 'react';

const EditJournalForm = ({ isOpen, onClose, onSubmit,journal }) => {
  console.log(journal)
  const [title, setTitle] = useState(journal.title);
  const [description, setDescription] = useState(journal.description);
  const [mood, setMood] = useState(journal.mood);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function and pass the form data
    onSubmit({ title, description, mood });
    // Clear form fields
    setTitle('');
    setDescription('');
    setMood('Happy');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-form">
      <div className="form-container">
        <h2 className="form-heading">Edit a Journal</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={journal.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={journal.description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Excited">Excited</option>
            <option value="Depressed">Depressed</option>
            <option value="Anxious">Anxious</option>
          </select>
          <div className="form-buttons">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJournalForm;
