export type ProjectStatus = 'finished' | 'in-progress' | 'planned'

export type Project = {
  /** File name shown in the sidebar and the index list, e.g. "portfolio.js". */
  fileName: string
  title: string
  status: ProjectStatus
  description: string
  stack: string[]
  repoUrl: string
  /** Demo video/GIF URL for the detail view — left unset until the material exists. */
  demoUrl?: string
}

export const projects: Project[] = [
  {
    fileName: 'portfolio.js',
    title: 'Portfolio',
    status: 'in-progress',
    description:
      'Este mismo portfolio, construido como una réplica funcional de IntelliJ IDEA (tema Darcula, New UI), con React, TypeScript, Tailwind CSS y React Router.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Vite'],
    repoUrl: 'https://github.com/isanzarenal/portfolio',
  },
  {
    fileName: 'elasticObservabilityLab.java',
    title: 'Elastic Observability Lab',
    status: 'finished',
    description:
      'Un playground práctico de observabilidad construido con Spring Boot, Elasticsearch y Kibana. Demuestra cómo diseñar y usar observabilidad sin depender de soluciones APM completas, centrándose en logs, correlación y dashboards.',
    stack: ['Java', 'Spring Boot', 'Elasticsearch', 'Kibana'],
    repoUrl: 'https://github.com/isanzarenal/elastic-observability-lab',
  },
]
