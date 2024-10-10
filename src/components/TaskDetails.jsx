import React from "react";
import SubtaskList from "./SubtaskList";

const TaskDetails = ({ subtasks, onToggleSubtaskCompletion }) => {
   return (
      <div className='details'>
         <h4>Szczegóły zadania</h4>
         <SubtaskList
            subtasks={subtasks}
            onToggleSubtaskCompletion={onToggleSubtaskCompletion}
         />
      </div>
   );
};

export default TaskDetails;
