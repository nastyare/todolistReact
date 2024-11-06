export const addTask = (title, description, setTasks, setTitle, setDescription, setNoTasksVisible) => {
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
        alert("Title and description cannot be empty.");
    }
};
