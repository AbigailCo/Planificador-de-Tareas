export default function FiltersStatus({ filter, onChange }) {
  const filters = [
    { key: 'all', label: 'Todas' },
    { key: 'completed', label: 'Completadas' },
    { key: 'pending', label: 'Pendientes' },
  ]

  return (
    <div className="flex justify-center gap-1 bg-[var(--c-brown)] p-1.5 rounded-xl border border-white/5 shadow-inner">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
            ${filter === key
              ? 'bg-[var(--c-primary)] text-[var(--c-ink)] shadow-lg shadow-[var(--c-primary)]/20'
              : 'text-[var(--c-slate)] hover:text-white hover:bg-white/5'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  )
}