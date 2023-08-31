import React from 'react';
import '../styles/LoadingPage.css';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
