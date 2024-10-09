import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TaskScreen from "./TaskScreen";
import TaskList from "./TaskList";

const App = () => {
   const [tasks, setTasks] = useState([]);
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [isLoaded, setIsLoaded] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [taskToDelete, setTaskToDelete] = useState(null);
   const [taskToEdit, setTaskToEdit] = useState(null);
   const [notification, setNotification] = useState("");

   const handleDeleteConfirmation = (id) => {
      setTaskToDelete(id);
      setShowDeleteModal(true);
   };

   const confirmDeleteTask = () => {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
      setShowDeleteModal(false);
   };

   const cancelDeleteTask = () => {
      setTaskToDelete(null);
      setShowDeleteModal(false);
   };

   const deleteTask = (id) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
   };

   const markDoneTask = (id) => {
      const currentDate = new Date().toISOString().split("T")[0];
      setTasks((prev) =>
         prev.map((task) =>
            task.id === id
               ? { ...task, active: false, finishDate: currentDate }
               : task
         )
      );
   };

   const undoTask = (id) => {
      setTasks((prev) =>
         prev.map((task) =>
            task.id === id ? { ...task, active: true, finishDate: null } : task
         )
      );
   };

   const addNewTask = (newTask) => {
      const task = { ...newTask, id: uuidv4() };
      setTasks((prev) => [...prev, task]);
      setNotification("Zadanie zostało dodane pomyślnie!");
   };

   const handleEditTask = (task) => {
      setTaskToEdit(task);
      openModal();
   };

   const updateTask = (updatedTask) => {
      setTasks((prevTasks) =>
         prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
         )
      );
      setNotification("Zadanie zostało zaktualizowane pomyślnie!");
      setTaskToEdit(null);
   };

   const toggleTheme = () => {
      setIsDarkMode((prev) => !prev);
   };

   const openModal = () => {
      setShowModal(true);
   };

   const closeModal = () => {
      setShowModal(false);
      setTaskToEdit(null);
   };

   useEffect(() => {
      if (isLoaded) {
         const data = JSON.stringify({ tasks, isDarkMode });
         localStorage.setItem("appState", data);
      }
   }, [tasks, isDarkMode, isLoaded]);

   useEffect(() => {
      const rawData = localStorage.getItem("appState");
      if (rawData) {
         const loadedData = JSON.parse(rawData);
         setTasks(loadedData.tasks);
         setIsDarkMode(loadedData.isDarkMode);
      }
      setIsLoaded(true);
   }, []);

   useEffect(() => {
      if (notification) {
         const timer = setTimeout(() => {
            setNotification("");
         }, 3000);
         return () => clearTimeout(timer);
      }
   }, [notification]);

   const todoTasks = tasks
      .filter((task) => task.active)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
   const doneTasks = tasks
      .filter((task) => !task.active)
      .sort((a, b) => new Date(b.finishDate) - new Date(a.finishDate))
      .slice(0, 5);

   const taskScreen = showModal && (
      <div className='modal'>
         <div className='modal-content'>
            <span className='close' onClick={closeModal}>
               &times;
            </span>
            <TaskScreen
               onClick={addNewTask}
               onUpdate={updateTask}
               onClose={closeModal}
               taskToEdit={taskToEdit}
            />
         </div>
      </div>
   );

   const confirmDel = showDeleteModal && (
      <div className='modal'>
         <div className='modal-content'>
            <h2>Czy na pewno chcesz usunąć to zadanie?</h2>
            <button onClick={confirmDeleteTask} className='btn btn-danger'>
               Usuń
            </button>
            <button onClick={cancelDeleteTask} className='btn btn-secondary'>
               Anuluj
            </button>
         </div>
      </div>
   );

   const notifyAlert = notification && (
      <div className='alert alert-success' role='alert'>
         {notification}
      </div>
   );

   return (
      <div className={`App ${isDarkMode ? "dark-theme" : "light-theme"}`}>
         {notifyAlert}
         <button
            type='button'
            className='link-button'
            onClick={openModal}
         ></button>
         {taskScreen}
         {confirmDel}
         <TaskList
            activeTasks={todoTasks}
            inactiveTasks={doneTasks}
            delete={handleDeleteConfirmation}
            done={markDoneTask}
            edit={handleEditTask}
            undo={undoTask}
         />
         <button
            onClick={toggleTheme}
            className='btn btn-outline-dark bottom-left'
         >
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
         </button>
      </div>
   );
};

export default App;
