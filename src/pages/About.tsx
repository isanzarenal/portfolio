import { MarkdownHeading } from '../components/MarkdownHeading'
import { aboutStack } from '../data/about'

export function About() {
  return (
    <div className="p-8">
      <div className="flex items-start gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border-2 border-accent bg-sidebar font-mono text-xs text-muted">
          foto
        </div>

        <div className="space-y-3 font-mono text-[15px] leading-relaxed">
          <h1 className="text-xl font-semibold text-fg">
            <span className="text-muted">#</span> Iván Sanz
          </h1>

          <p className="max-w-2xl font-sans text-base text-fg/90">
            Software engineer con{' '}
            <span className="text-accent">10+</span> años de experiencia.
            <br />
            Actualmente <span className="text-accent">Tech Lead</span> en
            software factory.
          </p>

          <div className="pt-3">
            <MarkdownHeading>stack</MarkdownHeading>
            <div className="pl-1">
              {Object.entries(aboutStack).map(([category, technologies]) => (
                <p key={category}>
                  <span className="text-type">&quot;{category}&quot;</span>
                  <span className="text-fg/70">: [</span>
                  {technologies.map((tech, index) => (
                    <span key={tech}>
                      <span className="text-string">&quot;{tech}&quot;</span>
                      {index < technologies.length - 1 && (
                        <span className="text-fg/70">, </span>
                      )}
                    </span>
                  ))}
                  <span className="text-fg/70">]</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
