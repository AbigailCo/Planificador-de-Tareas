import * as P from './pages'

function App() {
  return (
    <div className="min-h-screen bg-[var(--c-ink)] transition-colors duration-300">
      <header className="border-b border-white/5 bg-[var(--c-brown)]/50 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-[var(--c-primary)] text-center py-8 tracking-tight uppercase">
          Planificador de <span className="text-white">Tareas</span>
        </h1>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <P.TasksPage />
      </main>
      
    </div>
  )
}

export default App