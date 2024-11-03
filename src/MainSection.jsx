import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ShareModal from './ShareModal';
import EditTaskModal from './EditTaskModal';
import { saveTasksToLocalStorage, deleteTaskFromLocalStorage, loadTasksFromLocalStorage } from './LocalStorage';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

Modal.setAppElement('#root');

const MainSection = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState(loadTasksFromLocalStorage()); 
    const [noTasksVisible, setNoTasksVisible] = useState(tasks.length === 0); 
    const [isDeleteWindowOpen, setDeleteWindowOpen] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
    const [openedTaskId, setOpenedTaskId] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({ title: '', description: '' });

    useEffect(() => {
        saveTasksToLocalStorage(tasks);
        setNoTasksVisible(tasks.length === 0); 
    }, [tasks]);

    const addTask = () => {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();
    
        if (trimmedTitle && trimmedDescription) {
            const taskId = Date.now(); 
            const newTask = { id: taskId, title: trimmedTitle, description: trimmedDescription };
    
            setTasks(prevTasks => [...prevTasks, newTask]);
    
            setTitle('');
            setDescription('');
    
            setNoTasksVisible(false);
        } else {
            alert("Должны быть заполнены и название, и описание");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    const openDelete = (taskId) => {
        setTaskIdToDelete(taskId);
        setDeleteWindowOpen(true);
    };

    const deleteTask = () => {
        deleteTaskFromLocalStorage(taskIdToDelete);
        setTasks(tasks.filter(task => task.id !== taskIdToDelete));
        setDeleteWindowOpen(false);
    };

    const onCancel = () => {
        setDeleteWindowOpen(false);
        setTaskIdToDelete(null);
    };

    const toggleTaskMenu = (taskId) => {
        if (openedTaskId === taskId) {
            setOpenedTaskId(null);
        } else {
            setOpenedTaskId(taskId);
            // Выбор задачи для передачи в ShareModal
            const task = tasks.find(task => task.id === taskId);
            setSelectedTask(task);
        }
    };

    const openShareModal = (task) => {
        setSelectedTask(task);
        setShowShareModal(true);
    };

    const closeShareModal = () => {
        setShowShareModal(false);
    };

    const handleEditClick = (task) => {
        setCurrentTask(task);
        setEditModalOpen(true); // Открываем модальное окно редактирования
    };

    const handleSave = (newTitle, newDescription) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task => 
                task.title === currentTask.title ? { ...task, title: newTitle, description: newDescription } : task
            );
            saveTasksToLocalStorage(updatedTasks); // Сохраняем обновлённые задачи в локальное хранилище
            return updatedTasks; // Возвращаем обновлённое состояние задач
        });
        setEditModalOpen(false); // Закрываем модальное окно
    };

    const onDragEnd = (result) => {
        // Проверяем, есть ли результаты перетаскивания
        if (!result.destination) {
            return; // Если задача была сброшена, ничего не делаем
        }

        const reorderedTasks = Array.from(tasks); // Копируем текущий массив задач
        const [movedTask] = reorderedTasks.splice(result.source.index, 1); // Удаляем перемещенную задачу
        reorderedTasks.splice(result.destination.index, 0, movedTask); // Вставляем задачу в новое место

        setTasks(reorderedTasks); // Обновляем состояние с новыми позициями
    };

    return (
        <div className="main-section">
            <div className="base-form">
                <div className="input-section">
                    <input
                        type="text"
                        name="title-field"
                        className="title input-element"
                        placeholder="Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        name="description-field"
                        className="description input-element"
                        placeholder="About..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <button className="add-button" onClick={addTask}></button>
            </div>
            {noTasksVisible ? (
                <div className="no-tasks">
                    <p>No Tasks</p>
                </div>
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="taskList">
                        {(provided) => (
                            <ul
                                className="tasks-list"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {tasks.map((task, index) => (
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
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            )}

            <Modal 
                isOpen={isDeleteWindowOpen} 
                onRequestClose={onCancel}
                className="delete-window"
                overlayClassName="background"
            >
                <p>Delete this task?</p>
                <button onClick={deleteTask}>Yes</button>
                <button onClick={onCancel}>No</button>
            </Modal>

            {showShareModal && (
                <ShareModal
                    onClose={closeShareModal}
                    title={selectedTask.title}
                    fullDescription={selectedTask.description}
                />
            )}

            {isEditModalOpen && (
                <EditTaskModal
                    onClose={() => setEditModalOpen(false)}
                    taskTitle={currentTask.title}
                    taskDescription={currentTask.description}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default MainSection;
