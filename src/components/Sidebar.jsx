import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import '../styles/Sidebar.css'

const Sidebar = () => {
    const location = useLocation();
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">JournalPlus</h1>
      <p className="welcome-message">Welcome, username!</p>
      <div className="sidebar-buttons">
        <Link to="/" className={`sidebar-button ${location.pathname === '/' ? 'active' : ''}`}>
          My Journals
        </Link>
        <Link to="/calendar" className={`sidebar-button ${location.pathname === '/calendar' ? 'active' : ''}`}>
          My Calendar
        </Link>
        <Link to="/tasks" className={`sidebar-button ${location.pathname === '/tasks' ? 'active' : ''}`}>
          My Tasks
        </Link>
      </div>
      <button className="signout-button">Sign Out</button>
    </div>
  );
};

export default Sidebar;
