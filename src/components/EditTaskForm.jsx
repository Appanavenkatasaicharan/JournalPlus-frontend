import React, { useEffect, useState } from 'react';
import '../styles/CreateTaskForm.css';

const EditTaskForm = ({ isOpen, onClose, onCreate, task }) => {
  const [body, setBody] = useState('');

  useEffect(
    ()=>{
      setBody(task.body);
    },[task]
  )

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onCreate({ body });
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
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
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

export default EditTaskForm;
