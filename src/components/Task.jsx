import React, { useEffect, useState } from "react";

import TaskHeader from "./TaskHeader";
import TaskButtonGroup from "./TaskButtonGroup";
import TaskDetails from "./TaskDetails";
import "./Task.css";

const Task = ({ task, onDelete, inactive, done, onEdit, undo }) => {
   const [isDetailsVisible, setIsDetailsVisible] = useState(false);
   const [subtasks, setSubtasks] = useState(task.subtasks || []);

   // Synchronizacja stanu subtasks z props
   useEffect(() => {
      setSubtasks(task.subtasks || []);
   }, [task]);

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

   const itemStyle = `list-group-item ${
      task.important ? "list-group-item-danger" : ""
   }`;

   return (
      <ul className='list-group'>
         <li className={itemStyle}>
            <TaskHeader
               task={task}
               inactive={inactive}
               toggleDetails={toggleDetails}
            />
            <TaskButtonGroup
               task={task}
               inactive={inactive}
               done={done}
               onEdit={onEdit}
               undo={undo}
               onDelete={onDelete}
            />
         </li>
         <div className='task-details'>
            {isDetailsVisible && (
               <TaskDetails
                  subtasks={subtasks}
                  onToggleSubtaskCompletion={toggleSubtaskCompletion}
               />
            )}
         </div>
      </ul>
   );
};

export default Task;
