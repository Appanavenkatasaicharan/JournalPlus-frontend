import React from 'react';
import '../styles/ErrorPopup.css'

const ErrorPopup = ({ showError,message, onClose }) => {
  return (
    showError?
    <div className="error-popup">
      <div className="popup-content">
        <h2>Error</h2>
        <p>{message}</p>
        <button className="ok-button" onClick={onClose}>Ok</button>
      </div>
    </div>:
    null
  );
};

export default ErrorPopup;
