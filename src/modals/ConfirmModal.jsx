import React from 'react';
import Modal from 'react-modal';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="delete-window"
            overlayClassName="background"
        >
            <p>{message}</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onRequestClose}>No</button>
        </Modal>
    );
};

export default ConfirmModal;
