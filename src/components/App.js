import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TaskScreen from "./TaskScreen";
import TaskList from "./TaskList";
import DeleteModal from "./DeleteModal";
import Modal from "./Modal";
import Notification from "./Notification";

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

   const updateSubtasks = (updatedTask) => {
      setTasks((prevTasks) =>
         prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
         )
      );
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

   const confirmDel = showDeleteModal && (
      <DeleteModal cancel={cancelDeleteTask} confirm={confirmDeleteTask} />
   );

   return (
      <div className={`App ${isDarkMode ? "dark-theme" : "light-theme"}`}>
         <Notification message={notification} />
         <button
            type='button'
            className='link-button'
            onClick={openModal}
         ></button>
         <Modal isOpen={showModal} onClose={closeModal}>
            <TaskScreen
               onClick={addNewTask}
               onUpdate={updateTask}
               onClose={closeModal}
               taskToEdit={taskToEdit}
            />
         </Modal>
         {confirmDel}
         <TaskList
            activeTasks={todoTasks}
            inactiveTasks={doneTasks}
            deleteTask={handleDeleteConfirmation}
            done={markDoneTask}
            onEdit={handleEditTask}
            undo={undoTask}
            updateSubtasks={updateSubtasks}
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
