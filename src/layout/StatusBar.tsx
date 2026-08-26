import { useLocation } from 'react-router'
import { experienceEntries } from '../data/experience'

export function StatusBar() {
  const { pathname } = useLocation()

  if (pathname === '/experience') {
    return (
      <footer className="flex h-7 shrink-0 items-center gap-3 bg-accent px-3 font-mono text-xs text-white">
        <span>{experienceEntries.length} commits</span>
      </footer>
    )
  }

  if (pathname === '/contact') {
    return (
      <footer className="flex h-7 shrink-0 items-center gap-3 bg-accent px-3 font-mono text-xs text-white">
        <span>bash</span>
      </footer>
    )
  }

  return (
    <footer className="flex h-7 shrink-0 items-center gap-3 bg-accent px-3 font-mono text-xs text-white">
      <span>main</span>
      <span className="text-white/50">·</span>
      <span>UTF-8</span>
      <span className="text-white/50">·</span>
      <span>2 spaces</span>
    </footer>
  )
}
