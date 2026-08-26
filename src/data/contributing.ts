export type ContributingSection = {
  heading: string
  body: string
}

export const contributingSections: ContributingSection[] = [
  {
    heading: 'Code quality',
    body: 'Sigo principios SOLID y clean code de forma no negociable. El código debe ser mantenible antes que ingenioso.',
  },
  {
    heading: 'Testing & documentation',
    body: 'TDD/BDD siempre que el contexto del proyecto lo permite. Prefiero que los tests hagan de documentación viva antes que comentarios o wikis — un comentario deja de ser cierto a los cinco minutos de escribirse y nadie se acuerda de mantenerlo; un test falla si miente.',
  },
  {
    heading: 'Architecture',
    body: 'Domain-Driven Design cuando la complejidad del negocio lo justifica — diseñar pensando en el dominio, no solo en la tecnología.',
  },
  {
    heading: 'Collaboration',
    body: 'Code review y buenas prácticas compartidas con el equipo. Colaboración estrecha con QA y arquitectura para asegurar calidad end-to-end.',
  },
  {
    heading: 'Mentoring',
    body: 'Parte activa de cómo trabajo, no un extra — ayudar a que el equipo crezca es tan importante como el propio código.',
  },
  {
    heading: 'Observability',
    body: 'Trazas, métricas y logs estructurados como base de una buena monitorización, no como añadido de última hora.',
  },
  {
    heading: 'Process',
    body: 'Scrum y Kanban, según lo que mejor encaje con el equipo y el momento del proyecto. Conventional Commits para mantener un historial limpio y que facilite la trazabilidad.',
  }
]
