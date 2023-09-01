import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faCalendar, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateTaskForm from './CreateTaskForm';
import '../styles/TasksPage.css';
import EditTaskForm from './EditTaskForm';
import axios from 'axios';
import LoadingPage from './LoadingPage';

const TasksPage = ({token}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedTask,setSelectedTask] = useState({});
  const [isLoading,setIsLoading] = useState(true)

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  const handleCreateTask = (taskData) => {
    setIsLoading(true)
    axios.post('http://localhost:5000/api/v1/tasks',taskData,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{getAllTasks()})
    .catch(err=>console.log(err))
    handleFormClose();
  };

  const handleEditFormOpen = (task) => {
    setSelectedTask(task);
    setIsEditFormOpen(true);
  };
  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
  };
  const handleEditTask = (taskData) => {
    setIsLoading(true)
    axios.put(`http://localhost:5000/api/v1/tasks/${selectedTask._id}`,taskData,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{getAllTasks()})
    .catch(err=>console.log(err))
    handleFormClose();
  };


  // Example task data, replace with your actual task data
  const [tasks, setTasks] = useState([]);

  const getAllTasks = ()=>{
    axios.get('http://localhost:5000/api/v1/tasks',{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      setTasks(res.data.tasks);
      setIsLoading(false)
    })
    .catch(err=>console.log(err))
  }

  useEffect(
    ()=>{
      getAllTasks()
    },[]
  )

  const handleCheckboxClick = (task) => {
    axios.put(`http://localhost:5000/api/v1/tasks/${task._id}`,{completed:!task.completed},{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{getAllTasks()})
    .catch(err=>console.log(err))
  };

  const deleteTask = (task)=>{
    setIsLoading(true)
    axios.delete(`http://localhost:5000/api/v1/tasks/${task._id}`,{headers:{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{getAllTasks()})
    .catch(err=>console.log(err))
  }

  return (
    isLoading?
    <LoadingPage />:
    <div className="tasks-page">
      <div className="tasks-container">
        <h2 className="tasks-heading">My Tasks</h2>
        {tasks.map((task, index) => (
          <div key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="checkbox" onClick={() => handleCheckboxClick(task)}>
              <FontAwesomeIcon icon={task.completed ? faCheckCircle : faCircle} />
            </div>
            <div className="task-details">
              <h3>{task.body}</h3>
              <div className="icons">
                <FontAwesomeIcon icon={faCalendar} className="icon" />
                <FontAwesomeIcon icon={faEdit} className="icon" onClick={()=>handleEditFormOpen(task)} />
                <FontAwesomeIcon icon={faTrash} className="icon" onClick={()=>deleteTask(task)} />
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
