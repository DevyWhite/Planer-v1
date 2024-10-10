import React from "react";

const message = "Czy na pewno chcesz usunąć to zadanie?";

const DeleteModal = ({ cancel, confirm }) => {
   return (
      <div className='modal'>
         <div className='modal-content'>
            <h2>{message}</h2>
            <button onClick={confirm} className='btn btn-danger'>
               Usuń
            </button>
            <button onClick={cancel} className='btn btn-secondary'>
               Anuluj
            </button>
         </div>
      </div>
   );
};

export default DeleteModal;
