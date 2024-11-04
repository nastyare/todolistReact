import React, { useEffect, useRef, useState } from 'react';

const EditTaskModal = ({ onClose, taskTitle, taskDescription, onSave }) => {
    const [title, setTitle] = useState(taskTitle);
    const [description, setDescription] = useState(taskDescription);
    const modalRef = useRef();

    const handleSave = () => {
        onSave(title, description); // Сохраняем изменения
        onClose(); // Закрываем модальное окно
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // Закрываем модальное окно
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside); // Добавляем обработчик событий при монтировании
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Удаляем обработчик при размонтировании
        };
    }, []);

    return (
        <div className="edit-section background">
            <div className="edit" ref={modalRef}>
                <div className="edit-elements">
                    <input
                        name="edit-title-field"
                        className="title-element edit-element"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Обновляем название
                    />
                    <textarea
                        name="edit-description-field"
                        className="description-element edit-element"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Обновляем описание
                    />
                </div>
                <div className="buttons">
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
