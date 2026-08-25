import { skillCategories } from '../data/skills'

export function Skills() {
  return (
    <div className="p-8 font-mono text-[15px] leading-relaxed">
      <p className="text-fg/70">{'{'}</p>

      <div className="space-y-5 pl-4">
        {skillCategories.map((category, index) => {
          const valueClassName = category.legacy
            ? 'text-muted line-through'
            : 'text-string'

          return (
            <div
              key={category.annotation}
              role="group"
              aria-label={category.annotation}
            >
              {category.note && (
                <p className="pb-1 text-string/80 italic">
                  <span className="text-muted not-italic">// </span>
                  {category.note}
                </p>
              )}

              <p className={category.legacy ? 'text-muted line-through' : ''}>
                <span className={category.legacy ? 'text-muted' : 'text-keyword'}>
                  &quot;{category.annotation}&quot;
                </span>
                <span className="text-fg/70">: [</span>
              </p>

              <div className="flex flex-wrap gap-x-1 gap-y-1.5 pl-4">
                {category.technologies.map((tech, techIndex) => (
                  <span key={tech} className="whitespace-nowrap">
                    <span className="text-fg/70">&quot;</span>
                    <span className={valueClassName}>{tech}</span>
                    <span className="text-fg/70">&quot;</span>
                    {techIndex < category.technologies.length - 1 && (
                      <span className="text-fg/70">,</span>
                    )}
                  </span>
                ))}
              </div>

              <p className="text-fg/70">
                ]{index < skillCategories.length - 1 && ','}
              </p>
            </div>
          )
        })}
      </div>

      <p className="text-fg/70">{'}'}</p>
    </div>
  )
}
