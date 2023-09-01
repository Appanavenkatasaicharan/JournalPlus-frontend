import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import JournalPage from './components/JournalPage';
import CalendarPage from './components/CalendarPage';
import TasksPage from './components/TasksPage';
import AuthPage from './components/AuthPage';

function App() {
  // useEffect(
  //   ()=>{
  //     localStorage.setItem('token',null)
  //     localStorage.setItem('username',null)
  //   },[]
  // )
  const [token,setToken] = useState(localStorage.getItem('token'));
  const [username,setUsername] = useState(localStorage.getItem('username'));
  return (
      (!token)?
      <AuthPage setToken={setToken} setName={setUsername} /> :
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
