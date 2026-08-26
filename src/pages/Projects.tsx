import { Search } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useTabs } from '../layout/tabsContext'
import { projects, type Project } from '../data/projects'
import { getFileIcon } from '../lib/fileIcons'
import { STATUS_BADGE_CLASSNAME, STATUS_LABELS } from '../lib/projectStatus'

function highlightMatch(text: string, query: string): ReactNode {
  if (!query) return text
  const index = text.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return text

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-accent/30 text-fg">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  )
}

export function Projects() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { openTab } = useTabs()
  const normalizedQuery = query.trim().toLowerCase()

  const filteredProjects = normalizedQuery
    ? projects.filter(
        (project) =>
          project.fileName.toLowerCase().includes(normalizedQuery) ||
          project.stack.some((tech) =>
            tech.toLowerCase().includes(normalizedQuery),
          ),
      )
    : projects

  const activeCount = projects.filter((p) => p.status !== 'planned').length
  const plannedCount = projects.filter((p) => p.status === 'planned').length

  function openProject(project: Project) {
    const path = `/projects/${project.fileName}`
    openTab({ name: project.fileName, path })
    navigate(path)
  }

  return (
    <div className="p-8">
      <p className="mb-4 font-mono text-sm text-string">
        <span className="text-muted">// </span>
        el día a día ocurre en sistemas grandes bajo NDA — aquí muestro PoCs
        y proyectos personales
      </p>

      <div className="mb-2 flex items-center gap-2 rounded border border-border bg-sidebar px-3 py-2">
        <Search size={15} className="shrink-0 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nombre o tecnología..."
          aria-label="Buscar proyectos"
          className="w-full bg-transparent font-mono text-sm text-fg placeholder:text-muted focus:outline-none"
        />
      </div>

      <p className="mb-4 font-mono text-xs text-muted">
        {filteredProjects.length} de {projects.length} resultados
      </p>

      <div
        role="list"
        aria-label="Lista de proyectos"
        className="divide-y divide-border border-y border-border"
      >
        {filteredProjects.map((project) => {
          const { Icon, className } = getFileIcon(project.fileName)
          return (
            <button
              key={project.fileName}
              type="button"
              role="listitem"
              onClick={() => openProject(project)}
              className={`flex w-full items-center gap-3 px-2 py-2.5 text-left hover:bg-white/5 ${
                project.status === 'planned' ? 'opacity-60' : ''
              }`}
            >
              <Icon size={16} className={`shrink-0 ${className}`} />
              <span className="flex-1 truncate font-mono text-sm text-fg">
                {highlightMatch(project.fileName, normalizedQuery)}
              </span>
              <span
                className={`shrink-0 rounded px-2 py-0.5 font-mono text-xs ${STATUS_BADGE_CLASSNAME[project.status]}`}
              >
                {STATUS_LABELS[project.status]}
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-4 font-mono text-xs text-muted">
        {activeCount} activos · {plannedCount} planeados · {projects.length}{' '}
        en total
      </p>
    </div>
  )
}
