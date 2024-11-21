import React, { useState } from 'react'
import Modal from 'react-modal'
import ShareModal from '../modals/ShareModal'
import EditTaskModal from '../modals/EditTaskModal'
import InputSection from './InputSection'
import AddButton from './AddButton'
import NoTasks from './NoTasks'
import DragNDrop from './DragNDrop'
import ConfirmModal from '../modals/ConfirmModal'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, deleteTask, editTask, reorderTask } from '../redux/tasksSlice'
import { toast } from 'react-toastify'

Modal.setAppElement('#root')

const MainSection = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)
  const noTasksVisible = useSelector((state) => state.tasks.noTasksVisible)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isDeleteWindowOpen, setDeleteWindowOpen] = useState(false)
  const [taskIdToDelete, setTaskIdToDelete] = useState(null)
  const [openedTaskId, setOpenedTaskId] = useState(null)
  const [isShareModalOpen, setShowShareModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState({})
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState({ title: '', description: '' })

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTask()
    }
  }

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      dispatch(addTask({ title, description }))
      setTitle('')
      setDescription('')
    } else {
      toast.error('Title and description must be filled')
    }
  }

  // окно удаления
  const openDeleteWindow = (taskId) => {
    setTaskIdToDelete(taskId)
    setDeleteWindowOpen(true)
  }

  const deleteTaskHandler = () => {
    dispatch(deleteTask(taskIdToDelete))
    setDeleteWindowOpen(false)
  }

  // меню задачи
  const taskMenu = (taskId) => {
    if (openedTaskId === taskId) {
      setOpenedTaskId(null)
    } else {
      setOpenedTaskId(taskId)
      const task = tasks.find((task) => task.id === taskId)
      setSelectedTask(task)
    }
  }

  // окно для поделиться
  const openShareModal = (task) => {
    setSelectedTask(task)
    setShowShareModal(true)
    setOpenedTaskId(null)
  }

  // окно для редактирования
  const openEditModal = (task) => {
    setCurrentTask(task)
    setEditModalOpen(true)
    setOpenedTaskId(null)
  }

  const handleEditTask = (newTitle, newDescription) => {
    dispatch(editTask({ id: currentTask.id, newTitle, newDescription }))
    setEditModalOpen(false)
  }

  const onDragEnd = (result) => {
    if (!result.destination) return
    dispatch(
      reorderTask({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      }),
    )
  }

  return (
    <div className='main-section'>
      <div className='base-form'>
        <InputSection
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          handleKeyPress={handleKeyPress}
        />
        <AddButton onClick={handleAddTask} />
      </div>

      {noTasksVisible ? (
        <NoTasks />
      ) : (
        <DragNDrop
          tasks={tasks}
          openedTaskId={openedTaskId}
          taskMenu={taskMenu}
          openShareModal={openShareModal}
          openEditModal={openEditModal}
          openDeleteWindow={openDeleteWindow}
          onDragEnd={onDragEnd}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteWindowOpen}
        onRequestClose={() => setDeleteWindowOpen(false)}
        onConfirm={deleteTaskHandler}
      />

      {isShareModalOpen && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          title={selectedTask.title}
          fullDescription={selectedTask.description}
        />
      )}

      {isEditModalOpen && (
        <EditTaskModal
          onClose={() => setEditModalOpen(false)}
          taskTitle={currentTask.title}
          taskDescription={currentTask.description}
          onSave={handleEditTask}
        />
      )}
    </div>
  )
}

export default MainSection
