import React, { useEffect, useState } from 'react';
import '../styles/SetDeadlineForm.css'

const SetDeadlineForm = ({ showDeadlineForm,onClose, onSave,task }) => {
  const [deadline, setDeadline] = useState('');

  useEffect(
    ()=>{
        setDeadline('')
    },[task]
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(deadline);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    showDeadlineForm?
    <div className='overlay'>
    <div className="deadline-form-container">
      <h2 className="deadline-title">Set Deadline</h2>
      <form onSubmit={handleSubmit} className="deadline-form">
        <label htmlFor="deadline" className="deadline-label">
          Deadline Date:
        </label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className="deadline-input"
        />
        <div className="deadline-buttons">
          <button type="submit" className="deadline-submit" onSubmit={handleSubmit}>
            Save
          </button>
          <button type="button" className="deadline-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>:
    null
  );
};

export default SetDeadlineForm;
