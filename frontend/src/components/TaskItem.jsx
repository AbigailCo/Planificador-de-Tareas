import { useState } from "react";
import api from "../util/api";
import { toast } from "react-toastify";

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const saveEdit = async () => {
    const res = await api.put(`/tasks/${task._id}`, {
      title,
      description,
    });
    onUpdate(res.data);
      toast.success('Tarea editada correctamente');
    setIsEditing(false);
  };

  const toggleStatus = async () => {
    const res = await api.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    onUpdate(res.data);
      toast.success('Tarea actualizada correctamente');
  };

  const handleDelete = async () => {
    await api.delete(`/tasks/${task._id}`);
    onDelete(task._id);
    toast.success('Tarea eliminada correctamente');
    
  };

  return (
    <li className="bg-[var(--c-brown)] border border-white/5 p-4 rounded-xl shadow-lg transition-all hover:border-[var(--c-primary)]/30 group">
      {isEditing ? (
        <div className="space-y-3">
          <input
            className="w-full bg-[var(--c-ink)] border border-white/10 p-2 rounded text-white focus:outline-none focus:ring-1 focus:ring-[var(--c-primary)]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full bg-[var(--c-ink)] border border-white/10 p-2 rounded text-white focus:outline-none focus:ring-1 focus:ring-[var(--c-primary)] h-20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="bg-[var(--c-primary)] hover:bg-[var(--c-hover)] text-[var(--c-ink)] font-bold px-4 py-1.5 rounded transition-colors text-sm"
            >
              Guardar
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-[var(--c-graydark)] hover:bg-[var(--c-gray)] text-white px-4 py-1.5 rounded transition-colors text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <p
              className={`text-lg font-medium transition-all ${
                task.completed 
                ? "line-through text-[var(--c-gray)] opacity-50" 
                : "text-white"
              }`}
            >
              {task.title}
            </p>

            {task.description && (
              <p className="text-sm text-[var(--c-slate)] mt-1">
                {task.description}
              </p>
            )}

             <p
              className={`text-lg font-medium transition-all ${
                task.completed 
                ? "text-green-400" 
                : "text-yellow-400"
              }`}
            >
              {task.completed ? "Completada" : "Pendiente"}
            </p>
            
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={toggleStatus}
              className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all ${
                task.completed 
                ? "bg-[var(--c-graydark)] text-[var(--c-slate)] hover:bg-[var(--c-gray)]" 
                : "bg-[var(--c-primary)]/20 text-[var(--c-primary)] border border-[var(--c-primary)]/30 hover:bg-[var(--c-primary)] hover:text-black"
              }`}
            >
              {task.completed ? "Pendiente" : "Completar"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-full transition-all border border-white/10"
            >
              Editar
            </button>

            <button
              onClick={handleDelete}
              className="text-xs bg-red-950/30 hover:bg-red-600 text-red-500 hover:text-white px-3 py-1.5 rounded-full transition-all border border-red-500/20"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;