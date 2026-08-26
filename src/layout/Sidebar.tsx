import { useEffect, useState, type ReactNode } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { NavLink, useLocation, useNavigate } from 'react-router'
import { fileTree, type TreeNode } from '../data/fileTree'
import { getFileIcon, getFolderIcon } from '../lib/fileIcons'
import { useTabs } from './tabsContext'

const INDENT_PX = 14
/** Fixed slot every row reserves for its chevron, so file/folder icons always start at the same x — files render it empty. */
const CHEVRON_SLOT_PX = 14

const MIN_SIDEBAR_WIDTH = 180
const MAX_SIDEBAR_WIDTH = 400
const DEFAULT_SIDEBAR_WIDTH = 325

function ChevronSlot({ children }: { children?: ReactNode }) {
  return (
    <span
      style={{ width: CHEVRON_SLOT_PX }}
      className="flex shrink-0 items-center justify-center"
    >
      {children}
    </span>
  )
}

function FileRow({ node, depth }: { node: Extract<TreeNode, { type: 'file' }>; depth: number }) {
  const { Icon, className } = getFileIcon(node.name)
  const { openTab } = useTabs()
  const style = { paddingLeft: 8 + depth * INDENT_PX }

  if (node.path) {
    const path = node.path
    return (
      <NavLink
        to={path}
        onClick={() => openTab({ name: node.name, path })}
        style={style}
        className={({ isActive }) =>
          `flex min-w-0 items-center gap-2 rounded py-1 pr-2 text-sm ${
            isActive
              ? 'bg-accent/15 text-fg'
              : 'text-fg hover:bg-white/5'
          }`
        }
      >
        <ChevronSlot />
        <Icon size={15} className={`shrink-0 ${className}`} />
        <span className="min-w-0 flex-1 truncate font-mono">{node.name}</span>
      </NavLink>
    )
  }

  if (node.href) {
    return (
      <a
        href={node.href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        className="flex min-w-0 items-center gap-2 rounded py-1 pr-2 text-sm text-fg hover:bg-white/5"
      >
        <ChevronSlot />
        <Icon size={15} className={`shrink-0 ${className}`} />
        <span className="min-w-0 flex-1 truncate font-mono">{node.name}</span>
      </a>
    )
  }

  return (
    <div
      style={style}
      className="flex min-w-0 cursor-default items-center gap-2 py-1 pr-2 text-sm text-fg/90"
    >
      <ChevronSlot />
      <Icon size={15} className={`shrink-0 ${className}`} />
      <span className="min-w-0 flex-1 truncate font-mono">{node.name}</span>
    </div>
  )
}

function FolderRow({ node, depth }: { node: Extract<TreeNode, { type: 'folder' }>; depth: number }) {
  const [open, setOpen] = useState(true)
  const { Icon, className } = getFolderIcon(open)
  const { openTab } = useTabs()
  const navigate = useNavigate()
  const location = useLocation()
  const path = node.path
  const isActive = path !== undefined && location.pathname === path

  function handleToggle() {
    setOpen((o) => !o)
  }

  function handleOpen() {
    if (path) {
      openTab({ name: node.name, path })
      navigate(path)
    }
  }

  return (
    <div className="min-w-0">
      <div
        style={{ paddingLeft: 8 + depth * INDENT_PX }}
        className={`flex w-full min-w-0 items-center gap-2 py-1 pr-2 text-sm hover:bg-white/5 ${
          isActive ? 'bg-accent/15 text-fg' : 'text-fg'
        }`}
      >
        <button
          type="button"
          onClick={handleToggle}
          aria-label={open ? `Colapsar ${node.name}` : `Expandir ${node.name}`}
          className="cursor-pointer"
        >
          <ChevronSlot>
            {open ? (
              <ChevronDown size={13} className="text-muted" />
            ) : (
              <ChevronRight size={13} className="text-muted" />
            )}
          </ChevronSlot>
        </button>
        <button
          type="button"
          onClick={handleOpen}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
        >
          <Icon size={15} className={`shrink-0 ${className}`} />
          <span className="min-w-0 flex-1 truncate font-mono">{node.name}/</span>
        </button>
      </div>
      {open && (
        <div className="min-w-0">
          {node.children.map((child) => (
            <TreeRow key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

function TreeRow({ node, depth }: { node: TreeNode; depth: number }) {
  return node.type === 'folder' ? (
    <FolderRow node={node} depth={depth} />
  ) : (
    <FileRow node={node} depth={depth} />
  )
}

export function Sidebar() {
  const [width, setWidth] = useState(DEFAULT_SIDEBAR_WIDTH)
  const [isResizing, setIsResizing] = useState(false)

  useEffect(() => {
    if (!isResizing) return

    function handleMouseMove(event: MouseEvent) {
      const next = Math.min(
        MAX_SIDEBAR_WIDTH,
        Math.max(MIN_SIDEBAR_WIDTH, event.clientX),
      )
      setWidth(next)
    }
    function handleMouseUp() {
      setIsResizing(false)
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  return (
    <nav
      aria-label="Explorador de archivos"
      style={{ width }}
      className="relative flex shrink-0 flex-col overflow-x-hidden overflow-y-auto border-r border-border bg-sidebar py-2"
    >
      <div className="px-2 pb-1 font-mono text-xs text-muted">
        {fileTree.name}
      </div>
      {fileTree.children.map((node) => (
        <TreeRow key={node.name} node={node} depth={0} />
      ))}

      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Redimensionar explorador de archivos"
        onMouseDown={() => setIsResizing(true)}
        className={`absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-accent/40 ${
          isResizing ? 'bg-accent/40' : ''
        }`}
      />
    </nav>
  )
}
