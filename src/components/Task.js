import React from "react";
import { FaCheck } from "react-icons/fa";
import "./Task.css";

const Task = ({ task, click, inactive, done }) => {
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
            </div>
         </div>
         <div className='task-details'>
            {inactive ? (
               <>
                  <div>
                     <FaCheck className='icon check-icon' /> Wyokonano:{" "}
                     {task.finishDate}
                  </div>
               </>
            ) : (
               <div>Zrobić do: {task.date}</div>
            )}
         </div>
      </div>
   );
};

export default Task;
