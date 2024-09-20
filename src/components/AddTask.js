import React, { Component } from "react";
import "./AddTask.css"; // Załadowanie stylów

class AddTask extends Component {
   state = {
      newTask: {
         text: "",
         date: "",
         important: false,
         active: true,
         finishDate: null,
      },
      errors: {
         text: "",
         date: "",
      },
   };

   validateForm = () => {
      const { text, date } = this.state.newTask;
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

      this.setState({ errors });
      return Object.keys(errors).length === 0;
   };

   handleInputChange = (event) => {
      const { name, value, type, checked } = event.target;
      this.setState((prevState) => ({
         newTask: {
            ...prevState.newTask,
            [name]: type === "checkbox" ? checked : value,
         },
      }));
   };

   handleAddTask = () => {
      if (this.validateForm()) {
         this.props.onClick(this.state.newTask);
         this.props.onClose();
         this.setState({
            newTask: {
               text: "",
               date: "",
               important: false,
               active: true,
               finishDate: null,
            },
            errors: {},
         });
      }
   };

   render() {
      const { text, date, important } = this.state.newTask;
      const { errors } = this.state;

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
                  onChange={this.handleInputChange}
               />
               {errors.text && <div className='error'>{errors.text}</div>}
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
                  onChange={this.handleInputChange}
               />
               {errors.date && <div className='error'>{errors.date}</div>}
            </div>

            <div className='important-container'>
               <input
                  type='checkbox'
                  name='important'
                  checked={important}
                  onChange={this.handleInputChange}
               />
               <label className='important-label'>Ważne zadanie</label>
            </div>

            <button onClick={this.handleAddTask}>Dodaj zadanie</button>
         </div>
      );
   }
}

export default AddTask;
