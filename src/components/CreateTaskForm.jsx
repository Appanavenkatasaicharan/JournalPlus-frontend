import React, { useState } from 'react';
import '../styles/CreateTaskForm.css';

const CreateTaskForm = ({ isOpen, onClose, onCreate }) => {
  const [taskBody, setTaskBody] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onCreate({ body: taskBody });
    setTaskBody('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-form">
      <div className="form-container">
        <h2 className="form-heading">Create Task</h2>
        <form onSubmit={handleFormSubmit}>
          <textarea
            placeholder="Task Body"
            value={taskBody}
            onChange={(e) => setTaskBody(e.target.value)}
            required
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

export default CreateTaskForm;
