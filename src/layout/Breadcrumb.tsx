import { useLocation } from 'react-router'

const ROUTE_SEGMENTS: Record<string, string[]> = {
  '/about': ['portfolio', 'about.md'],
  '/skills': ['portfolio', 'skills.json'],
  '/projects': ['portfolio', 'projects'],
}

const PROJECT_DETAIL_PREFIX = '/projects/'

export function Breadcrumb() {
  const { pathname } = useLocation()
  const isProjectDetail = pathname.startsWith(PROJECT_DETAIL_PREFIX)
  const segments = isProjectDetail
    ? [
        'portfolio',
        'projects',
        decodeURIComponent(pathname.slice(PROJECT_DETAIL_PREFIX.length)),
      ]
    : (ROUTE_SEGMENTS[pathname] ?? ['portfolio'])

  return (
    <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-border bg-editor px-3 font-mono text-xs text-muted">
      {segments.map((segment, index) => (
        <span key={segment} className="flex items-center gap-1.5">
          {index > 0 && <span className="text-muted/60">{'>'}</span>}
          <span className={index === segments.length - 1 ? 'text-fg/80' : ''}>
            {segment}
          </span>
        </span>
      ))}
      {isProjectDetail && (
        <span className="ml-auto flex items-center gap-1.5 text-success">
          <span className="text-[10px]">●</span> preview
        </span>
      )}
    </div>
  )
}
