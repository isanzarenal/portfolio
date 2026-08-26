import { Film, FolderGit2, Play } from 'lucide-react'
import { useParams } from 'react-router'
import { projects } from '../data/projects'
import { STATUS_BADGE_CLASSNAME, STATUS_LABELS } from '../lib/projectStatus'

export function ProjectDetail() {
  const { fileName } = useParams<{ fileName: string }>()
  const project = projects.find((p) => p.fileName === fileName)

  if (!project) {
    return (
      <div className="p-8 font-mono text-sm text-muted">
        Proyecto no encontrado.
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex h-64 items-center justify-center rounded-lg border border-border bg-sidebar">
        <div className="flex items-center gap-2 text-muted">
          <Film size={18} />
          <span className="font-mono text-sm">vista previa próximamente</span>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-fg">{project.title}</h1>
        <span
          className={`shrink-0 rounded px-2 py-0.5 font-mono text-xs ${STATUS_BADGE_CLASSNAME[project.status]}`}
        >
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      <p className="mb-5 max-w-2xl font-sans text-[15px] leading-relaxed text-fg/90">
        {project.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-fg/80"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
        >
          <FolderGit2 size={16} />
          ver repositorio
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-border px-4 py-2 text-sm text-fg hover:bg-white/5"
          >
            <Play size={16} />
            ver demo completa
          </a>
        )}
      </div>
    </div>
  )
}
