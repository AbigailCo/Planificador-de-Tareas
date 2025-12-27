import { useState } from 'react'
import api from '../util/api'
import { toast } from 'react-toastify'

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error('El titulo es obligatorio')
      return
    }

    try {
     

      const res = await api.post('/tasks', {
        title: title.trim(),
        description: description.trim()
      })

      onAdd(res.data)
      toast.success('Tarea creada correctamente')

      setTitle('')
      setDescription('')
    } catch (error) {
      toast.error('Error al crear la tarea')
    } 
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--c-brown)] p-6 rounded-xl border border-white/10 shadow-2xl space-y-4"
    >
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-[var(--c-primary)] font-bold ml-1">
          Nueva Tarea
        </label>
        <input
          className="w-full bg-[var(--c-ink)] border border-white/10 p-3 rounded-lg text-white placeholder-[var(--c-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)] focus:border-transparent transition-all"
          placeholder="Titulo de la tarea..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <textarea
        className="w-full bg-[var(--c-ink)] border border-white/10 p-3 rounded-lg text-white placeholder-[var(--c-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)] focus:border-transparent transition-all h-24 resize-none"
        placeholder="Agrega una descripcion (opcional)..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button className="w-full bg-[var(--c-primary)] hover:bg-[var(--c-hover)] text-[var(--c-ink)] font-black uppercase py-3 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-[var(--c-primary)]/10">
        Agregar tarea
      </button>
    </form>
  )
}

export default TaskForm