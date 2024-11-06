import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

const DragNDrop = ({ tasks, openedTaskId, toggleTaskMenu, openShareModal, handleEditClick, openDelete, onDragEnd }) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList">
            {(provided) => (
                <ul className="tasks-list" {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((task, index) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            index={index}
                            openedTaskId={openedTaskId}
                            toggleTaskMenu={toggleTaskMenu}
                            openShareModal={openShareModal}
                            handleEditClick={handleEditClick}
                            openDelete={openDelete}
                        />
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    </DragDropContext>
);

export default DragNDrop;
