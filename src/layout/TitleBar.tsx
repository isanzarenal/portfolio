import { GitBranch, Menu, Minus, Square, X } from 'lucide-react'

export function TitleBar() {
  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-border bg-sidebar pr-2 pl-3 text-fg select-none">
      <div className="flex items-center gap-3">
        <Menu size={16} className="text-muted" />
        <span className="font-mono text-sm">ivansanz — portfolio</span>
        <span className="flex items-center gap-1 text-muted text-xs">
          <GitBranch size={13} />
          main
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-medium text-white">
          IS
        </div>
        <div className="flex items-center gap-1 text-muted">
          <button
            type="button"
            aria-label="Minimizar"
            className="flex h-7 w-9 items-center justify-center rounded hover:bg-white/10"
          >
            <Minus size={14} />
          </button>
          <button
            type="button"
            aria-label="Maximizar"
            className="flex h-7 w-9 items-center justify-center rounded hover:bg-white/10"
          >
            <Square size={12} />
          </button>
          <button
            type="button"
            aria-label="Cerrar"
            className="flex h-7 w-9 items-center justify-center rounded hover:bg-red-500/80 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </header>
  )
}
