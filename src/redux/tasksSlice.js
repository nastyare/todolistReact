import { createSlice } from '@reduxjs/toolkit'
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from '../storage/localStorage'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

const initialState = {
  tasks: loadTasksFromLocalStorage(),
  noTasksVisible: loadTasksFromLocalStorage().length === 0,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, description } = action.payload
      const newTask = {
        id: uuidv4(),
        title: title.trim(),
        description: description.trim(),
      }
      state.tasks.push(newTask)
      state.noTasksVisible = state.tasks.length === 0
      saveTasksToLocalStorage(state.tasks)
    },
    editTask: (state, action) => {
      const { id, newTitle, newDescription } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.title = newTitle
        task.description = newDescription
      }
      saveTasksToLocalStorage(state.tasks)
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      state.noTasksVisible = state.tasks.length === 0
      saveTasksToLocalStorage(state.tasks)
    },
    reorderTask: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload
      const reorderedTasks = Array.from(state.tasks)
      const [movedTask] = reorderedTasks.splice(sourceIndex, 1)
      reorderedTasks.splice(destinationIndex, 0, movedTask)
      state.tasks = reorderedTasks
      saveTasksToLocalStorage(state.tasks)
    },
    copyTask(_, action) {
      const { title, fullDescription } = action.payload
      const taskText = `${title} ${fullDescription}`
      navigator.clipboard
        .writeText(taskText)
        .then(() => {
          toast.success('Task copied successfully!')
        })
        .catch((err) => {
          console.error('something went wrong: ', err)
        })
    },
  },
})

export const { addTask, editTask, deleteTask, reorderTask, copyTask } = tasksSlice.actions
export default tasksSlice.reducer
