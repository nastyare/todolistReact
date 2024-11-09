const copyTask = (title, fullDescription) => {
    const taskText = `${title} ${fullDescription}`;
    return navigator.clipboard.writeText(taskText)
        .then(() => {
            alert('Text is copied');
        })
        .catch(err => {
            console.error('Something went wrong: ', err);
        });
};

export default copyTask;
