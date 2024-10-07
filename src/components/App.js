import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const App = () => {
   const [tasks, setTasks] = useState([]);
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [isLoaded, setIsLoaded] = useState(false);

   const addNewTask = (newTask) => {
      const newId = tasks.length; //nowe id dla obiektu w tasks
      const task = { ...newTask, id: newId }; //nowy task do dodania do state
      setTasks((prev) => [...prev, task]);
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

   const toggleTheme = () => {
      setIsDarkMode((prev) => !prev);
   };

   const toggleModal = () => {
      setShowModal((prev) => !prev);
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

   const todoTasks = tasks
      .filter((task) => task.active)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
   const doneTasks = tasks
      .filter((task) => !task.active)
      .sort((a, b) => new Date(b.finishDate) - new Date(a.finishDate))
      .slice(0, 5);

   return (
      <div className={`App ${isDarkMode ? "dark-theme" : "light-theme"}`}>
         <button
            type='button'
            className='link-button'
            onClick={toggleModal}
         ></button>
         {/* Modal */}
         {showModal && (
            <div className='modal'>
               <div className='modal-content'>
                  <span className='close' onClick={toggleModal}>
                     &times;
                  </span>
                  <AddTask onClick={addNewTask} onClose={toggleModal} />
               </div>
            </div>
         )}

         <TaskList
            activeTasks={todoTasks}
            inactiveTasks={doneTasks}
            delete={deleteTask}
            done={markDoneTask}
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
