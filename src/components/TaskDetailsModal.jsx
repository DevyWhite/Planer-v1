import React from "react";
import "./TaskDetailsModal.css"; // Upewnij się, że masz odpowiedni CSS

const TaskDetailsModal = ({ task, onClose }) => {
   console.log(task);
   return (
      <div className='modal-overlay'>
         <div className='modal-content'>
            <span className='close' onClick={onClose}>
               &times;
            </span>
            <h2>Szczegóły zadania</h2>
            <p>
               <strong>Opis:</strong> {task.text}
            </p>
            <p>
               <strong>Termin:</strong> {task.date}
            </p>
            <p>
               <strong>Data ukończenia:</strong> {task.finishDate || "N/A"}
            </p>
            <p>
               <strong>Lista zadań dodatkowych:</strong>
            </p>
            <ul>
               {task.additionalList?.map((item, index) => (
                  <li key={index}>{item}</li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default TaskDetailsModal;
