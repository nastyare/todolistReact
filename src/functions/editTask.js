import { saveTasksToLocalStorage } from '../storage/LocalStorage';

const saveTask = (currentTask, newTitle, newDescription) => {    
    setCurrentTask(prevTasks => {
        const updatedTasks = prevTasks.map(task =>
            task.title === currentTask.title
                ? { ...task, title: newTitle, description: newDescription }
                : task
        );
        saveTasksToLocalStorage(updatedTasks);
        return updatedTasks;
    });
};

export default saveTask;
