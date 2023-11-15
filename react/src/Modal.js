import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <p>Apakah Anda yakin ingin logout?</p>
        <div className="button-container">
          <button className="confirm" onClick={onConfirm}>Ya</button>
          <button className="cancel" onClick={onClose}>Tidak</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
