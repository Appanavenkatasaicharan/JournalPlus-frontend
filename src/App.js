import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import JournalPage from './components/JournalPage';
import CalendarPage from './components/CalendarPage';
import TasksPage from './components/TasksPage';

function App() {
  return (
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
