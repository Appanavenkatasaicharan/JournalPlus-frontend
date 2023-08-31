import React, { useState } from 'react';
import '../styles/CreateTaskForm.css';

const EditTaskForm = ({ isOpen, onClose, onCreate, task }) => {
  const [taskBody, setTaskBody] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call the onCreate function and pass the task body
    onCreate({ body: taskBody });
    // Clear the form field
    setTaskBody('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-form">
      <div className="form-container">
        <h2 className="form-heading">Edit Task</h2>
        <form onSubmit={handleFormSubmit}>
          <textarea
            placeholder="Task Body"
            value={task.title}
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

export default EditTaskForm;
