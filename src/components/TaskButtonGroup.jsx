import React from "react";

const TaskButtonGroup = ({ task, inactive, done, onEdit, undo, onDelete }) => {
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
