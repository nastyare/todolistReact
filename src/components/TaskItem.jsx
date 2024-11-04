import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskItem = ({
    task,
    index,
    openedTaskId,
    toggleTaskMenu,
    openShareModal,
    handleEditClick,
    openDelete
}) => {
    return (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`task-item ${openedTaskId === task.id ? 'expanded' : ''}`}
                >
                    <div
                        onClick={() => toggleTaskMenu(task.id)}
                        className={`task-content ${openedTaskId === task.id ? 'expanded' : ''}`}
                    >
                        <h3>{task.title}</h3>
                        <p>{task.description.length > 80 ? task.description.substring(0, 80) + '...' : task.description}</p>
                    </div>
                    {openedTaskId === task.id && (
                        <div className="task-menu">
                            <button className="share-button" onClick={() => openShareModal(task)}></button>
                            <button className="info-button"></button>
                            <button className="edit-button" onClick={() => handleEditClick(task)}></button>
                        </div>
                    )}
                    <button className="delete-button" onClick={() => openDelete(task.id)}></button>
                </li>
            )}
        </Draggable>
    );
};

export default TaskItem;
