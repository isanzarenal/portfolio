import { MarkdownHeading } from '../components/MarkdownHeading'
import { contributingSections } from '../data/contributing'

export function Contributing() {
  return (
    <div className="p-8">
      <div className="max-w-2xl space-y-4 font-mono text-[15px] leading-relaxed">
        <h1 className="text-xl font-semibold text-fg">
          <span className="text-muted"># </span>Contributing
        </h1>

        {contributingSections.map((section) => (
          <div key={section.heading} className="pt-1">
            <MarkdownHeading>{section.heading}</MarkdownHeading>
            <p className="mt-1 max-w-2xl font-sans text-base text-fg/90">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
