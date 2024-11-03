export const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const deleteTaskFromLocalStorage = (taskId) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasksList = tasks.filter(task => task.id !== taskId); 
    localStorage.setItem('tasks', JSON.stringify(updatedTasksList));
};

export const loadTasksFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
};