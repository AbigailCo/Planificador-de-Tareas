import TaskItem from './TaskItem'

function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <div className="w-full">
      {tasks.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-2xl">
          <p className="text-[var(--c-slate)] font-medium">No hay tareas que mostrar</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList