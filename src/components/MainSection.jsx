import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ShareModal from '../modals/ShareModal';
import EditTaskModal from '../modals/EditTaskModal';
import { deleteTaskFromLocalStorage } from '../storage/LocalStorage';
import { addTask } from './AddTask';
import EditTask from './EditTask';
import InputSection from './InputSection';
import AddButton from './AddButton';
import NoTasks from './NoTasks';
import DragNDrop from './DragNDrop';
import ConfirmModal from '../modals/ConfirmModal';

Modal.setAppElement('#root');

const MainSection = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { tasks, setTasks, handleSave } = EditTask();
    const [noTasksVisible, setNoTasksVisible] = useState(tasks.length === 0);
    const [isDeleteWindowOpen, setDeleteWindowOpen] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
    const [openedTaskId, setOpenedTaskId] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({ title: '', description: '' });

    useEffect(() => {
        setNoTasksVisible(tasks.length === 0);
    }, [tasks]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask(title, description, setTasks, setTitle, setDescription, setNoTasksVisible);
        }
    };

    // окно удаления
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


    // меню задачи
    const toggleTaskMenu = (taskId) => {
        if (openedTaskId === taskId) {
            setOpenedTaskId(null);
        } else {
            setOpenedTaskId(taskId);
            const task = tasks.find(task => task.id === taskId);
            setSelectedTask(task);
        }
    };


    // окно для поделиться
    const openShareModal = (task) => {
        setSelectedTask(task);
        setShowShareModal(true);
    };

    const closeShareModal = () => {
        setShowShareModal(false);
    };

    // окно для редактирования 
    const handleEditClick = (task) => {
        setCurrentTask(task);
        setEditModalOpen(true);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedTasks = Array.from(tasks);
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(reorderedTasks);
    };

    return (
        <div className="main-section">
            <div className="base-form">
                <InputSection
                    title={title}
                    description={description}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    handleKeyPress={handleKeyPress}
                />
                <AddButton
                    onClick={() => addTask(title, description, setTasks, setTitle, setDescription, setNoTasksVisible)}
                />
            </div>
           
            {noTasksVisible ? (
                <NoTasks />
            ) : (
                <DragNDrop
                    tasks={tasks}
                    openedTaskId={openedTaskId}
                    toggleTaskMenu={toggleTaskMenu}
                    openShareModal={openShareModal}
                    handleEditClick={handleEditClick}
                    openDelete={openDelete}
                    onDragEnd={onDragEnd}
                />
            )}
            <ConfirmModal
                isOpen={isDeleteWindowOpen}
                onRequestClose={onCancel}
                onConfirm={deleteTask}
                message="Delete this task?"
            />

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
                    onSave={(newTitle, newDescription) => handleSave(currentTask, newTitle, newDescription)}
                />
            )}
        </div>
    );
};

export default MainSection;
