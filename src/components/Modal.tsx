import React from 'react';
import './Modal.css';


interface ModalProps {
  isOpen: boolean;          // Para saber si se debe mostrar o no.
  onClose: () => void;      // La función que se ejecuta al cerrar.
  children: React.ReactNode; // El contenido que irá dentro del modal.
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {

  if (!isOpen) {
    return null;
  }


  return (

    <div className="modal-overlay" onClick={onClose}>




      <div className="modal-content" onClick={(e) => e.stopPropagation()}>


        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>


        {children}

      </div>
    </div>
  );
};

export default Modal;
