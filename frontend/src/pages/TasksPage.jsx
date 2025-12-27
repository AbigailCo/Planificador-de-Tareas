import { useEffect, useState } from 'react'
import api from '../util/api'
import * as C from '../components'

function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState('desc')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks')
      setTasks(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addTask = (newTask) => {
    setTasks(prev => [newTask, ...prev])
  }

  const updateTask = (updatedTask) => {
    setTasks(prev =>
      prev.map(task =>
        task._id === updatedTask._id ? updatedTask : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task._id !== id))
  }

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed
      if (filter === 'pending') return !task.completed
      return true
    })
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (order === 'asc') {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  if (loading) return <C.Cargando />

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
   
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <aside className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
          <section>
            <C.TaskForm onAdd={addTask} />
          </section>

          <section className="bg-[var(--c-brown)]/30 p-4 rounded-xl border border-white/5 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar tarea..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[var(--c-ink)] border border-white/10 p-3 rounded-lg text-white placeholder-[var(--c-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)] transition-all"
              />
            </div>

            <div className="flex flex-col gap-4">
              <C.FiltersStatus
                filter={filter}
                onChange={setFilter}
              />
              
              <button
                onClick={() => setOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-[var(--c-primary)] py-3 rounded-lg bg-[var(--c-primary)]/10 hover:bg-[var(--c-primary)]/20 transition-all border border-[var(--c-primary)]/20"
              >
                {order === 'desc' ? 'ORDEN: MAS ACTUALES' : 'ORDEN: MAS ANTIGUAS'}
              </button>
            </div>
          </section>
        </aside>

        {/* COLUMNA DERECHA: Lista de Tareas */}
        <main className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">
              Mis Tareas <span className="text-[var(--c-primary)] ml-2">({filteredTasks.length})</span>
            </h2>
          </div>
          
          <C.TaskList
            tasks={filteredTasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </main>

      </div>
    </div>
  )
}

export default TasksPage