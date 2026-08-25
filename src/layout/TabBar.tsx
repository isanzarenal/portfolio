import { NavLink } from 'react-router'
import { getFileIcon } from '../lib/fileIcons'

type Tab = {
  name: string
  path?: string
}

const OPEN_TABS: Tab[] = [
  { name: 'about.md', path: '/about' },
  { name: 'skills.json', path: '/skills' },
]

export function TabBar() {
  return (
    <div className="flex h-9 shrink-0 border-b border-border bg-sidebar">
      {OPEN_TABS.map((tab) => {
        const { Icon, className } = getFileIcon(tab.name)

        if (tab.path) {
          return (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center gap-2 border-r border-border px-3 text-sm ${
                  isActive
                    ? 'border-t-2 border-t-accent bg-editor text-fg'
                    : 'border-t-2 border-t-transparent text-muted hover:text-fg'
                }`
              }
            >
              <Icon size={14} className={className} />
              <span className="font-mono">{tab.name}</span>
            </NavLink>
          )
        }

        return (
          <div
            key={tab.name}
            className="flex cursor-default items-center gap-2 border-t-2 border-t-transparent border-r border-border px-3 text-sm text-muted"
          >
            <Icon size={14} className={className} />
            <span className="font-mono">{tab.name}</span>
          </div>
        )
      })}
    </div>
  )
}
