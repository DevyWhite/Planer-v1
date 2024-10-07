import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
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

   const itemStyle = `list-group-item ${
      task.important ? "list-group-item-danger" : ""
   }`;

   return (
      <ul className='list-group'>
         <li className={itemStyle} onClick={toggleDetails}>
            <strong>{task.text}</strong>
            {!inactive && <div>Zrobić do: {task.date}</div>}
            {inactive && (
               <div>
                  <FaCheck className='check-icon' /> Wyokonano:{" "}
                  {task.finishDate}
               </div>
            )}
            <div className='task-buttons'>
               {!inactive && (
                  <button
                     onClick={() => done(task.id)}
                     className='btn btn-success done-btn2'
                  >
                     Zrobione
                  </button>
               )}
               <button
                  onClick={() => click(task.id)}
                  className='btn btn-danger delete-btn2'
               >
                  Usuń
               </button>
            </div>
         </li>
         <div className='task-details'>
            {isDetailsVisible && (
               <div className='details'>
                  <h4>Szczegóły zadania</h4>
                  <div>{addList}</div>
               </div>
            )}
         </div>
      </ul>
   );
};

export default Task;
