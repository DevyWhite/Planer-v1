import React, { useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";
import "./Task.css";

const Task = ({ task, click, inactive, done }) => {
   const [isDetailsVisible, setIsDetailsVisible] = useState(false);
   const [subtasks, setSubtasks] = useState(task.subtasks || []);

   const toggleDetails = () => {
      setIsDetailsVisible((prev) => !prev);
   };

   const toggleSubtaskCompletion = (subtaskIndex) => {
      const updatedSubtasks = subtasks.map((subtask, index) => {
         if (index === subtaskIndex) {
            return { ...subtask, completed: !subtask.completed }; // Zmiana statusu subtasku
         }
         return subtask;
      });
      setSubtasks(updatedSubtasks); // Aktualizacja stanu subtasks
   };

   const addList =
      Array.isArray(subtasks) && subtasks.length > 0 ? (
         subtasks.map((subtask, index) => (
            <div
               key={index}
               onClick={() => toggleSubtaskCompletion(index)}
               className={`subtask ${subtask.completed ? "completed" : ""}`}
            >
               {subtask.completed ? <s>{subtask.text}</s> : subtask.text}
            </div>
         ))
      ) : (
         <p>Brak podzadań</p>
      );

   return (
      <div>
         <div className='task-header'>
            <strong>{task.text}</strong>
            <div className='task-buttons'>
               {!inactive && (
                  <button onClick={() => done(task.id)} className='done-btn'>
                     Zostało zrobione
                  </button>
               )}
               <button onClick={() => click(task.id)} className='delete-btn'>
                  Usuń
               </button>
               <button onClick={toggleDetails} className='details-btn'>
                  <FaSearch /> {/* Ikona lupy */}
               </button>
            </div>
         </div>
         <div className='task-details'>
            {isDetailsVisible && (
               <div className='details'>
                  <h4>Szczegóły zadania</h4>
                  <div>{addList}</div>
                  {inactive && (
                     <div>
                        <FaCheck className='icon check-icon' /> Wyokonano:{" "}
                        {task.finishDate}
                     </div>
                  )}
                  {!inactive && <div>Zrobić do: {task.date}</div>}
               </div>
            )}
         </div>
      </div>
   );
};

export default Task;
