import { Building2, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { experienceEntries, type ExperienceEntry } from '../data/experience'
import { commitHash } from '../lib/commitHash'

function StackTags({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-1 gap-y-1.5">
      {stack.map((tech, index) => (
        <span key={tech} className="whitespace-nowrap font-mono text-sm">
          <span className="text-fg/70">&quot;</span>
          <span className="text-string">{tech}</span>
          <span className="text-fg/70">&quot;</span>
          {index < stack.length - 1 && <span className="text-fg/70">,</span>}
        </span>
      ))}
    </div>
  )
}

function CompanyLogo({ company, logoUrl }: { company: string; logoUrl?: string }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`Logo de ${company}`}
        className="h-10 w-10 shrink-0 rounded-md border border-border object-contain"
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`Logo de ${company} no disponible`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-sidebar text-muted"
    >
      <Building2 size={18} />
    </div>
  )
}

function ExperienceRow({
  entry,
  isExpanded,
  onToggle,
}: {
  entry: ExperienceEntry
  isExpanded: boolean
  onToggle: () => void
}) {
  const hash = commitHash(entry.id)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Colapsar' : 'Expandir'} ${entry.company}`}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
      >
        <CompanyLogo company={entry.company} logoUrl={entry.logoUrl} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-fg">
            <span className="font-medium">{entry.role}</span>
            <span className="text-muted"> · {entry.company}</span>
            {entry.viaCompany && (
              <span className="ml-1.5 text-xs text-muted/70">
                vía {entry.viaCompany}
              </span>
            )}
          </p>
          <p className="font-mono text-xs text-muted">
            <span className="text-type">{hash}</span> · {entry.dateRange}
          </p>
        </div>

        <MoreHorizontal size={16} className="shrink-0 text-muted" />
      </button>

      {isExpanded && (
        <div className="space-y-4 border-t border-border bg-sidebar/40 px-4 py-4">
          <p className="font-mono text-xs text-muted">
            <span className="text-fg/90">{entry.role}</span> ·{' '}
            {entry.dateRange}
          </p>

          <p className="max-w-2xl font-sans text-sm leading-relaxed text-fg/90">
            {entry.description}
          </p>

          <div>
            <p className="mb-1.5 font-mono text-xs text-muted">
              tareas habituales
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-fg/90">
              {entry.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-1.5 font-mono text-xs text-muted">
              tecnologías
            </p>
            <StackTags stack={entry.stack} />
          </div>
        </div>
      )}
    </div>
  )
}

export function Experience() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(experienceEntries.length > 0 ? [experienceEntries[0].id] : []),
  )

  function toggle(id: string) {
    setExpandedIds((previous) => {
      const next = new Set(previous)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="p-8">
      <div className="rounded border border-border">
        {experienceEntries.map((entry) => (
          <ExperienceRow
            key={entry.id}
            entry={entry}
            isExpanded={expandedIds.has(entry.id)}
            onToggle={() => toggle(entry.id)}
          />
        ))}
      </div>
    </div>
  )
}
