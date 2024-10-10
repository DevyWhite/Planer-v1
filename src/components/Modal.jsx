import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
   if (!isOpen) return null; // Jeśli modal nie jest otwarty, nie renderuj nic

   return (
      <div className='modal'>
         <div className='modal-content'>
            <span className='close' onClick={onClose}>
               &times;
            </span>
            {children}
         </div>
      </div>
   );
};

export default Modal;
