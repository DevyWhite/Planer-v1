import React from "react";
import Task from "./Task";
import "./TaskList.css";

const TaskList = ({
   activeTasks,
   inactiveTasks,
   deleteTask,
   done,
   onEdit,
   undo,
}) => {
   const renderTasks = (tasks, isInactive) =>
      tasks.map((task) => (
         <div
            className={`task-card ${task.important ? "important" : ""}`}
            key={task.id}
         >
            <Task
               task={task}
               onDelete={deleteTask} // Zmiana nazwy na bardziej opisową
               done={done}
               onEdit={onEdit}
               inactive={isInactive}
               undo={isInactive ? undo : undefined}
            />
         </div>
      ));

   return (
      <div>
         <div className='task-section active'>
            <hr className='line' />
            <h2>Zadania do Zrobienia</h2>
            <div className='task-list'>{renderTasks(activeTasks, false)}</div>
         </div>
         <div className='task-section inactive'>
            <hr className='line' />
            <h3>{`Zadania zrobione (${inactiveTasks.length})`}</h3>
            <div className='task-list'>{renderTasks(inactiveTasks, true)}</div>
         </div>
      </div>
   );
};

export default TaskList;
