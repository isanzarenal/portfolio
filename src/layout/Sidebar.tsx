import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { NavLink } from 'react-router'
import { fileTree, type TreeNode } from '../data/fileTree'
import { getFileIcon, getFolderIcon } from '../lib/fileIcons'
import { useTabs } from './tabsContext'

const INDENT_PX = 14

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
          `flex items-center gap-2 rounded py-1 pr-2 text-sm ${
            isActive
              ? 'bg-accent/15 text-fg'
              : 'text-fg hover:bg-white/5'
          }`
        }
      >
        <Icon size={15} className={className} />
        <span className="font-mono">{node.name}</span>
      </NavLink>
    )
  }

  return (
    <div
      style={style}
      className="flex cursor-default items-center gap-2 py-1 pr-2 text-sm text-fg/90"
    >
      <Icon size={15} className={className} />
      <span className="font-mono">{node.name}</span>
    </div>
  )
}

function FolderRow({ node, depth }: { node: Extract<TreeNode, { type: 'folder' }>; depth: number }) {
  const [open, setOpen] = useState(true)
  const { Icon, className } = getFolderIcon(open)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ paddingLeft: 8 + depth * INDENT_PX }}
        className="flex w-full cursor-pointer items-center gap-1 py-1 pr-2 text-left text-sm text-fg hover:bg-white/5"
      >
        {open ? (
          <ChevronDown size={13} className="text-muted" />
        ) : (
          <ChevronRight size={13} className="text-muted" />
        )}
        <Icon size={15} className={className} />
        <span className="font-mono">{node.name}/</span>
      </button>
      {open && (
        <div>
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
  return (
    <nav
      aria-label="Explorador de archivos"
      className="flex w-60 shrink-0 flex-col overflow-y-auto border-r border-border bg-sidebar py-2"
    >
      <div className="px-2 pb-1 font-mono text-xs text-muted">
        {fileTree.name}
      </div>
      {fileTree.children.map((node) => (
        <TreeRow key={node.name} node={node} depth={0} />
      ))}
    </nav>
  )
}
