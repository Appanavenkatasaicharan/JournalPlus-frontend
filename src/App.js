import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import JournalPage from './components/JournalPage';
import CalendarPage from './components/CalendarPage';
import TasksPage from './components/TasksPage';
import AuthPage from './components/AuthPage';

function App() {
  return (
      // <AuthPage />
      <div className="app-container">
      <Router>
      <Sidebar />
      <div className='content-container'>
      <Routes>
          <Route path="/" element={<JournalPage/>} />
          <Route path="/calendar" element={<CalendarPage/>} />
          <Route path="/tasks" element={<TasksPage/>} />
        </Routes>
        </div>
      </Router>
      </div>
  );
}

export default App;
