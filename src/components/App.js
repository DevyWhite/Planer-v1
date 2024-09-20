import React, { Component } from "react";
import "./App.css";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

class App extends Component {
   state = {
      tasks: [],
      isDarkMode: false, // Dodaj stan dla motywu
      showModal: false,
   };

   addNewTask = (newTask) => {
      const newId = this.state.tasks.length; //nowe id dla obiektu w tasks
      const task = { ...newTask, id: newId }; //nowy task do dodania do state
      this.setState((prevState) => ({
         tasks: [...prevState.tasks, task],
      }));
   };

   deleteTask = (id) => {
      this.setState((prevState) => ({
         tasks: prevState.tasks.filter((task) => task.id !== id),
      }));
   };

   markDoneTask = (id) => {
      const currentDate = new Date().toISOString().split("T")[0];
      this.setState((prevState) => ({
         tasks: prevState.tasks.map((task) =>
            task.id === id
               ? { ...task, active: false, finishDate: currentDate }
               : task
         ),
      }));
   };

   toggleTheme = () => {
      this.setState((prevState) => ({
         isDarkMode: !prevState.isDarkMode,
      }));
   };

   // Metoda do otwierania modala
   openModal = () => {
      this.setState({ showModal: true });
   };

   // Metoda do zamykania modala
   closeModal = () => {
      this.setState({ showModal: false });
   };

   componentDidUpdate() {
      this.saveStateToLocalStorage();
   }

   componentDidMount() {
      this.loadDataFromLocalStorage();
   }

   saveStateToLocalStorage() {
      const data = JSON.stringify(this.state);
      localStorage.setItem("appState", data);
   }

   loadDataFromLocalStorage() {
      const rawData = localStorage.getItem("appState");
      if (rawData) {
         const loadedState = JSON.parse(rawData);
         this.setState(loadedState);
      }
   }

   render() {
      const todoTasks = this.state.tasks
         .filter((task) => task.active)
         .sort((a, b) => new Date(a.date) - new Date(b.date));
      const doneTasks = this.state.tasks
         .filter((task) => !task.active)
         .sort((a, b) => new Date(b.finishDate) - new Date(a.finishDate))
         .slice(0, 5);

      return (
         <div
            className={`App ${
               this.state.isDarkMode ? "dark-theme" : "light-theme"
            }`}
         >
            <button
               type='button'
               className='link-button'
               onClick={this.openModal}
            ></button>
            {/* Modal */}
            {this.state.showModal && (
               <div className='modal'>
                  <div className='modal-content'>
                     <span className='close' onClick={this.closeModal}>
                        &times;
                     </span>
                     <AddTask
                        onClick={this.addNewTask}
                        onClose={this.closeModal}
                     />
                  </div>
               </div>
            )}

            <TaskList
               activeTasks={todoTasks}
               inactiveTasks={doneTasks}
               delete={this.deleteTask}
               done={this.markDoneTask}
            />
            <button onClick={this.toggleTheme} className='theme-toggle'>
               {this.state.isDarkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"}
            </button>
         </div>
      );
   }
}

export default App;
