import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TasksList from './TasksList';

const DragNDrop = ({ tasks, openedTaskId, taskMenu, openShareModal, openEditModal, openDeleteWindow, onDragEnd }) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <TasksList
            tasks={tasks}
            openedTaskId={openedTaskId}
            taskMenu={taskMenu}
            openShareModal={openShareModal}
            openEditModal={openEditModal}
            openDeleteWindow={openDeleteWindow}
        />
    </DragDropContext>
);

export default DragNDrop;
