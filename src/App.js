import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import JournalPage from './components/JournalPage';
import CalendarPage from './components/CalendarPage';
import TasksPage from './components/TasksPage';
import AuthPage from './components/AuthPage';

function App() {
  // Obtain auth token and username from the session storage.
  const [token,setToken] = useState(sessionStorage.getItem('token'));
  const [username,setUsername] = useState(sessionStorage.getItem('username'));
  return (

      (!token)? // Load signin page if token is not present
      <AuthPage setToken={setToken} setName={setUsername} /> : // My signin and signup form
      // Else load the app.
      <div className="app-container"> 
      <Router>
      <Sidebar username={username} setToken={setToken} setUserName={setUsername} />
      <div className='content-container'>
      <Routes>
          <Route path="/" element={<JournalPage token={token} />} />
          <Route path="/calendar" element={<CalendarPage token={token} />} />
          <Route path="/tasks" element={<TasksPage token={token} />} />
        </Routes>
        </div>
      </Router>
      </div>
  );
}

export default App;
