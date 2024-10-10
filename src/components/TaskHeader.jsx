import React from "react";
import { FaCheck } from "react-icons/fa";

const TaskHeader = ({ task, inactive, toggleDetails }) => {
   return (
      <div onClick={toggleDetails} className='add-pointer'>
         <strong>{task.text}</strong>
         {!inactive && <div>Zrobić do: {task.date}</div>}
         {inactive && (
            <div>
               <FaCheck className='check-icon' /> Wyokonano: {task.finishDate}
            </div>
         )}
      </div>
   );
};

export default TaskHeader;
