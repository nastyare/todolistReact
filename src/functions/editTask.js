import { saveTasksToLocalStorage } from '../storage/localStorage';

const editTask = (currentTask, newTitle, newDescription, setTasks) => {    
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

export default editTask;
