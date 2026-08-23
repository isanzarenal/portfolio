import {
  Braces,
  Coffee,
  FileCode,
  FileText,
  FileType2,
  Folder,
  FolderOpen,
  Image,
  ScrollText,
  Terminal,
  type LucideIcon,
} from 'lucide-react'

type IconMatch = {
  Icon: LucideIcon
  className: string
}

const EXTENSION_ICONS: Record<string, IconMatch> = {
  md: { Icon: FileText, className: 'text-accent' },
  json: { Icon: Braces, className: 'text-type' },
  jpg: { Icon: Image, className: 'text-success' },
  jpeg: { Icon: Image, className: 'text-success' },
  png: { Icon: Image, className: 'text-success' },
  log: { Icon: ScrollText, className: 'text-muted' },
  pdf: { Icon: FileType2, className: 'text-muted' },
  java: { Icon: Coffee, className: 'text-type' },
  js: { Icon: FileCode, className: 'text-warning' },
  py: { Icon: FileCode, className: 'text-accent' },
}

const DEFAULT_ICON: IconMatch = { Icon: FileText, className: 'text-muted' }

export function getFileIcon(name: string): IconMatch {
  if (name === 'contact') {
    return { Icon: Terminal, className: 'text-muted' }
  }
  const extension = name.split('.').pop()?.toLowerCase()
  if (!extension) return DEFAULT_ICON
  return EXTENSION_ICONS[extension] ?? DEFAULT_ICON
}

export function getFolderIcon(open: boolean): IconMatch {
  return { Icon: open ? FolderOpen : Folder, className: 'text-type' }
}
