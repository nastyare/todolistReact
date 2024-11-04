import { useState, useEffect } from 'react';
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from '../storage/LocalStorage';

const EditTask = () => {
    const [tasks, setTasks] = useState(loadTasksFromLocalStorage());

    useEffect(() => {
        saveTasksToLocalStorage(tasks);
    }, [tasks]);

    const handleSave = (currentTask, newTitle, newDescription) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
                task.title === currentTask.title
                    ? { ...task, title: newTitle, description: newDescription }
                    : task
            );
            saveTasksToLocalStorage(updatedTasks);
            return updatedTasks;
        });
    };

    return { tasks, setTasks, handleSave };
};

export default EditTask;
