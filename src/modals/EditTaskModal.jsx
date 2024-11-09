import React, { useRef, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

const EditTaskModal = ({ onClose, taskTitle, taskDescription, onSave }) => {
    const [title, setTitle] = useState(taskTitle);
    const [description, setDescription] = useState(taskDescription);
    const modalRef = useRef();

    const handleSave = () => {
        if (!title.trim() || !description.trim()) {
            alert("Title and description cannot be empty.");
            return;
        }
        onSave(title, description); 
        onClose();
    };

    useOutsideClick(modalRef, onClose);

    const isDisabled = !title.trim() || !description.trim();

    return (
        <div className="edit-section background">
            <div className="edit" ref={modalRef}>
                <div className="edit-elements">
                    <input
                        name="edit-title-field"
                        className="title-element edit-element"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        name="edit-description-field"
                        className="description-element edit-element"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <div className="buttons">
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    <button className="save" onClick={handleSave} disabled={isDisabled}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
