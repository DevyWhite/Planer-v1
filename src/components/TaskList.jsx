import React from "react";
import Task from "./Task";
import "./TaskList.css";

const TaskList = (props) => {
   const activeTaskList = props.activeTasks.map((task) => (
      <div
         className={`task-card ${task.important ? "important" : ""}`}
         key={task.id}
      >
         <Task task={task} click={props.delete} done={props.done} />
      </div>
   ));
   const inactiveTaskList = props.inactiveTasks.map((task) => (
      <div
         className={`task-card ${task.important ? "important" : ""}`}
         key={task.id}
      >
         <Task task={task} click={props.delete} inactive={true} />
      </div>
   ));
   return (
      <div>
         <div className='task-section active'>
            <hr className='line' />
            <h2>Zadania do Zrobienia</h2>
            <div className='task-list'>{activeTaskList}</div>
         </div>
         <div className='task-section inactive'>
            <hr className='line' />
            <h3>{`Zadania zrobione (${props.inactiveTasks.length})`}</h3>
            <div className='task-list'>{inactiveTaskList}</div>
         </div>
      </div>
   );
};

export default TaskList;
