export const addTask = (title, description, setTitle, setDescription, setTasks, setNoTasksVisible) => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (trimmedTitle && trimmedDescription) {
        const taskId = Date.now();
        const newTask = { id: taskId, title: trimmedTitle, description: trimmedDescription };

        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks, newTask];
            return updatedTasks;
        });
        
        setTitle('');
        setDescription('');
        setNoTasksVisible(false);
    } 
};

