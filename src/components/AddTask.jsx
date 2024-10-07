import React, { useState } from "react";
import "./AddTask.css";

const AddTask = ({ onClick, onClose }) => {
   const [newTask, setNewTask] = useState({
      text: "",
      date: "",
      important: false,
      active: true,
      finishDate: null,
   });
   const [additionalList, setAdditionalList] = useState([]);
   const [textError, setTextError] = useState("");
   const [dateError, setDateError] = useState("");
   const [showSubtasks, setShowSubtasks] = useState(false);
   const [subtaskText, setSubtaskText] = useState("");

   const validateForm = () => {
      const { text, date } = newTask;
      const errors = {};

      // Walidacja treści zadania
      if (!text.trim()) {
         errors.text = "Treść zadania jest wymagana.";
      }

      // Walidacja daty
      const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
      if (!date) {
         errors.date = "Data jest wymagana.";
      } else if (date < today) {
         errors.date = "Data nie może być wcześniejsza niż dzisiaj.";
      }

      setDateError(errors.date || "");
      setTextError(errors.text || "");
      return Object.keys(errors).length === 0;
   };

   const handleInputChange = (event) => {
      const { name, value, type, checked } = event.target;
      setNewTask((prevTask) => ({
         ...prevTask,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const handleAddTask = () => {
      if (validateForm()) {
         onClick({ ...newTask, subtasks: additionalList });
         onClose();
         setNewTask({
            text: "",
            date: "",
            important: false,
            active: true,
            finishDate: null,
         });
         setAdditionalList([]);
         setSubtaskText("");
      }
   };

   const handleAddSubtask = () => {
      if (subtaskText.trim()) {
         setAdditionalList((prev) => [
            ...prev,
            { text: subtaskText, completed: false },
         ]);
         setSubtaskText("");
      }
   };

   const subtaskDelete = (index) => {
      setAdditionalList((prev) => prev.filter((_, i) => i !== index));
   };

   const { text, date, important } = newTask;

   return (
      <div className='add-task-container'>
         <div className='text-container'>
            <label htmlFor='text' className='text-label'>
               Treść zadania
            </label>
            <input
               type='text'
               id='text'
               name='text'
               placeholder='Wpisz treść zadania'
               value={text}
               onChange={handleInputChange}
            />
            {textError && (
               <div class='alert alert-danger' role='alert'>
                  {textError}
               </div>
            )}
         </div>

         <div className='date-container'>
            <label htmlFor='date' className='date-label'>
               Do kiedy wykonać
            </label>
            <input
               type='date'
               id='date'
               name='date'
               value={date}
               onChange={handleInputChange}
            />
            {dateError && (
               <div class='alert alert-danger' role='alert'>
                  {dateError}
               </div>
            )}
         </div>

         <div className='important-container'>
            <input
               type='checkbox'
               name='important'
               checked={important}
               onChange={handleInputChange}
            />
            <label className='important-label'>Ważne zadanie</label>
         </div>

         <div className='subtask-container'>
            <div
               className='subtask-header'
               onClick={() => setShowSubtasks(!showSubtasks)}
            >
               Lista podzadań
            </div>
            {showSubtasks && (
               <>
                  <input
                     type='text'
                     className='subtask-input'
                     placeholder='Wpisz podzadanie'
                     value={subtaskText}
                     onChange={(e) => setSubtaskText(e.target.value)}
                  />
                  <button
                     onClick={handleAddSubtask}
                     class='btn btn-outline-success'
                  >
                     Dodaj podzadanie
                  </button>
                  <ul class='list-group'>
                     {additionalList.map((subtask, index) => (
                        <li
                           key={index}
                           onClick={() => subtaskDelete(index)}
                           class='list-group-item list-group-item-action'
                        >
                           {subtask.text}
                        </li>
                     ))}
                  </ul>
               </>
            )}
         </div>

         <button class='btn btn-outline-primary' onClick={handleAddTask}>
            Dodaj zadanie
         </button>
      </div>
   );
};

export default AddTask;
