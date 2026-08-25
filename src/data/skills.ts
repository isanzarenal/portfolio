export type SkillCategory = {
  /** Java-style annotation shown as the JSON key, e.g. "@Core". */
  annotation: string
  /** One-line context note shown in the UI. Only needed for categories whose name alone could be misread. */
  note?: string
  technologies: string[]
  /** Renders the whole block struck through — retired technologies only. */
  legacy?: boolean
}

export const skillCategories: SkillCategory[] = [
  {
    annotation: '@Core',
    technologies: [
      'Java 8-21',
      'Spring / Spring Boot (REST, JPA)',
      'Maven',
      'Docker',
      'Git/GitFlow',
      'Jira',
      'Scrum',
      'JUnit',
      'Mockito',
      'SonarQube',
      'OpenShift',
      'Kibana',
      'Oracle DB',
    ],
  },
  {
    annotation: '@Familiar',
    technologies: [
      'Kafka',
      'Jenkins',
      'GitLab CI',
      'GitHub Actions',
      'PostgreSQL',
      'Cucumber',
      'Confluence',
      'Gradle',
      'Hibernate/JPA',
      'Grafana',
      'MongoDB',
      'MariaDB',
      'DB2',
      'Vue.js',
      'AngularJS',
    ],
  },
  {
    annotation: '@Learning',
    technologies: ['React', 'IA Generativa / LLMs'],
  },
  {
    annotation: '@Sandbox',
    note: 'exploración: PoCs, proyectos personales o experiencias puntuales, sin profundidad suficiente aún para hablar de dominio real',
    technologies: ['Blockchain / smart contracts'],
  },
  {
    annotation: '@Standby',
    note: 'experiencia real, en pausa mientras me centro en el stack actual — no descartadas ni obsoletas',
    technologies: [
      'Kubernetes',
      'Groovy/Spock',
      'Pact',
      'Gatling',
      'Fitnesse',
      'SQL Server',
    ],
  },
  {
    annotation: '@Legacy',
    note: 'obsoletas, ya no tiene sentido usarlas hoy',
    technologies: [
      'Struts 2',
      'JSP',
      '.NET Framework/.NET Core',
      'Informix',
      'CVS',
      'Subversion',
      'Tomcat/Glassfish',
      'Dhtmlx',
      'JasperReport',
      'Windows Server 2008/2012',
      'VirtualBox',
    ],
    legacy: true,
  },
]
