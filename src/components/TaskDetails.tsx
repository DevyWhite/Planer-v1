import { FC } from "react";
import SubtaskList from "./SubtaskList";

interface Subtask {
   text: string;
   completed: boolean;
}

interface TaskDetailsProps {
   subtasks: Subtask[];
   onToggleSubtaskCompletion: (index: number) => void; // Typ dla funkcji
}

const TaskDetails: FC<TaskDetailsProps> = ({
   subtasks,
   onToggleSubtaskCompletion,
}) => {
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
