import type { ReactNode } from 'react'

/** "## heading" styled like a rendered markdown H2 — shared by every section that previews markdown (about.md, contributing.md). */
export function MarkdownHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-string">
      <span className="text-muted">##</span> {children}
    </p>
  )
}
