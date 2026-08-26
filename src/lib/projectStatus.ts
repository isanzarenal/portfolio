import type { ProjectStatus } from '../data/projects'

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  finished: 'finished',
  'in-progress': 'in progress',
  planned: 'planned',
}

export const STATUS_BADGE_CLASSNAME: Record<ProjectStatus, string> = {
  finished: 'border border-success/40 bg-success/10 text-success',
  'in-progress': 'border border-warning/40 bg-warning/10 text-warning',
  planned: 'border border-dashed border-muted/50 text-muted',
}
