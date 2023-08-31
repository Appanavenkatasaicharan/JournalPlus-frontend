import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faCalendar, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateTaskForm from './CreateTaskForm';
import '../styles/TasksPage.css';
import EditTaskForm from './EditTaskForm';
import LoadingPage from './LoadingPage';

const TasksPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedTask,setSelectedTask] = useState({});

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  const handleCreateTask = (taskData) => {
    // Implement task creation logic here
    console.log('Task Data:', taskData);
  };

  const handleEditFormOpen = (task) => {
    setSelectedTask(task);
    setIsEditFormOpen(true);
  };
  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
  };
  const handleEditTask = (taskData) => {
    // Implement task creation logic here
    console.log('Task Data:', taskData);
  };


  // Example task data, replace with your actual task data
  const [tasks, setTasks] = useState([
    { title: 'Complete project report', completed: false },
    { title: 'Prepare presentation', completed: true },
    { title: 'Prepare presentation', completed: true },
    { title: 'Prepare presentation', completed: true },
    { title: 'Prepare presentation', completed: true },
    { title: 'Prepare presentation', completed: true },
    { title: 'Prepare presentation', completed: true },
    { title: 'Prepare presentation', completed: true },
    { title: 'Prepare presentation', completed: true },
    // ...
  ]);

  const handleCheckboxClick = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    // <LoadingPage />
    <div className="tasks-page">
      <div className="tasks-container">
        <h2 className="tasks-heading">My Tasks</h2>
        {tasks.map((task, index) => (
          <div key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="checkbox" onClick={() => handleCheckboxClick(index)}>
              <FontAwesomeIcon icon={task.completed ? faCheckCircle : faCircle} />
            </div>
            <div className="task-details">
              <h3>{task.title}</h3>
              <div className="icons">
                <FontAwesomeIcon icon={faCalendar} className="icon" />
                <FontAwesomeIcon icon={faEdit} className="icon" onClick={()=>handleEditFormOpen(task)} />
                <FontAwesomeIcon icon={faTrash} className="icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-task-button" onClick={handleFormOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <EditTaskForm isOpen={isEditFormOpen} onClose={handleEditFormClose} onCreate={handleEditTask} task={selectedTask}/>
      <CreateTaskForm isOpen={isFormOpen} onClose={handleFormClose} onCreate={handleCreateTask} />
    </div>
  );
};

export default TasksPage;
