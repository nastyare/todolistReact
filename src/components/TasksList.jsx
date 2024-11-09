import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

const TasksList = ({ tasks, openedTaskId, taskMenu, openShareModal, openEditModal, openDeleteWindow }) => (
    <Droppable droppableId="taskList">
        {(provided) => (
            <ul className="tasks-list" {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        index={index}
                        openedTaskId={openedTaskId}
                        taskMenu={taskMenu}
                        openShareModal={openShareModal}
                        openEditModal={openEditModal}
                        openDeleteWindow={openDeleteWindow}
                    />
                ))}
                {provided.placeholder}
            </ul>
        )}
    </Droppable>
);

export default TasksList;
