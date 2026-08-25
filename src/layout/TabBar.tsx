import { X } from 'lucide-react'
import { NavLink } from 'react-router'
import { getFileIcon } from '../lib/fileIcons'
import { useTabs } from './tabsContext'

export function TabBar() {
  const { openTabs, closeTab } = useTabs()

  return (
    <div
      aria-label="Pestañas abiertas"
      className="flex h-9 shrink-0 items-stretch overflow-x-auto border-b border-border bg-sidebar"
    >
      {openTabs.map((tab) => {
        const { Icon, className } = getFileIcon(tab.name)

        return (
          <div
            key={tab.path}
            className="group relative flex shrink-0 items-stretch border-r border-border"
          >
            <NavLink
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center gap-2 border-t-2 py-0 pl-3 pr-7 text-sm ${
                  isActive
                    ? 'border-t-accent bg-editor text-fg'
                    : 'border-t-transparent text-muted hover:text-fg'
                }`
              }
            >
              <Icon size={14} className={className} />
              <span className="font-mono">{tab.name}</span>
            </NavLink>
            <button
              type="button"
              aria-label={`Cerrar ${tab.name}`}
              onClick={() => closeTab(tab.path)}
              className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded p-0.5 text-muted opacity-0 hover:bg-white/10 hover:text-fg group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100"
            >
              <X size={13} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
