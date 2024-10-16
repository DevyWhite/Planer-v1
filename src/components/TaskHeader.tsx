import { FC } from "react";
import { FaCheck } from "react-icons/fa";

interface TaskHeaderProps {
   task: {
      text: string;
      date: string;
      finishDate: string;
   };
   inactive: boolean;
   toggleDetails: () => void;
}

const TaskHeader: FC<TaskHeaderProps> = ({ task, inactive, toggleDetails }) => {
   return (
      <div onClick={toggleDetails} className='add-pointer'>
         <strong>{task.text}</strong>
         {!inactive && <div>Zrobić do: {task.date}</div>}
         {inactive && (
            <div>
               <FaCheck className='check-icon' /> Wykonano: {task.finishDate}
            </div>
         )}
      </div>
   );
};

export default TaskHeader;
