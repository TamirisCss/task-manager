const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB5] bg-opacity-10 text-[#00ADB5]'
    }

    if (task.status === 'in_progress') {
      return 'bg-[#F8B500] bg-opacity-10 text-[#F8B500]'
    }

    if (task.status === 'not_started') {
      return 'bg-[#2A363B] bg-opacity-10 text-[#2A363B]'
    }
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </div>
  )
}

export default TaskItem
