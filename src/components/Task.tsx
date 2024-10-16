import { FC, useEffect, useState } from "react";

import TaskHeader from "./TaskHeader";
import TaskButtonGroup from "./TaskButtonGroup";
import TaskDetails from "./TaskDetails";
import "./Task.css";

interface Subtask {
   text: string;
   completed: boolean;
}

interface TaskProps {
   task: {
      id: string;
      text: string;
      date: string;
      important: boolean;
      active: boolean;
      finishDate: string;
      subtasks: Subtask[];
   };
   onDelete: (id: string) => void;
   inactive: boolean;
   done: (id: string) => void;
   onEdit: (task: {
      id: string;
      text: string;
      date: string;
      important: boolean;
      active: boolean;
      finishDate: string;
      subtasks: Subtask[];
   }) => void;
   undo: (id: string) => void;
   onUpdateTask: (task: { id: string; subtasks: Subtask[] }) => void;
}

const Task: FC<TaskProps> = ({
   task,
   onDelete,
   inactive,
   done,
   onEdit,
   undo,
   onUpdateTask,
}) => {
   const [isDetailsVisible, setIsDetailsVisible] = useState(false);
   const [subtasks, setSubtasks] = useState(task.subtasks || []);

   // Synchronizacja stanu subtasks z props
   useEffect(() => {
      setSubtasks(task.subtasks || []);
   }, [task]);

   const toggleDetails = () => {
      setIsDetailsVisible((prev) => !prev);
   };

   const toggleSubtaskCompletion = (subtaskIndex: number) => {
      const updatedSubtasks = subtasks.map((subtask, index) => {
         if (index === subtaskIndex) {
            return { ...subtask, completed: !subtask.completed };
         }
         return subtask;
      });
      setSubtasks(updatedSubtasks);
      onUpdateTask({ ...task, subtasks: updatedSubtasks });
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
