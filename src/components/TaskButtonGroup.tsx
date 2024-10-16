import { FC } from "react";

interface Subtask {
   text: string;
   completed: boolean;
}

interface Task {
   id: string;
   text: string;
   date: string;
   important: boolean;
   active: boolean;
   finishDate: string;
   subtasks: Subtask[];
}

interface TaskButtonGroupProps {
   task: Task;
   inactive: boolean;
   done: (id: string) => void;
   onEdit: (task: Task) => void;
   undo: (id: string) => void;
   onDelete: (id: string) => void;
}

const TaskButtonGroup: FC<TaskButtonGroupProps> = ({
   task,
   inactive,
   done,
   onEdit,
   undo,
   onDelete,
}) => {
   return (
      <div className='task-buttons'>
         {!inactive && (
            <>
               <button
                  onClick={() => done(task.id)}
                  className='btn btn-success'
               >
                  Zrobione
               </button>
               <button onClick={() => onEdit(task)} className='btn btn-primary'>
                  Edytuj
               </button>
            </>
         )}
         {inactive && (
            <button onClick={() => undo(task.id)} className='btn btn-primary'>
               Cofnij
            </button>
         )}
         <button onClick={() => onDelete(task.id)} className='btn btn-danger'>
            Usuń
         </button>
      </div>
   );
};

export default TaskButtonGroup;
