import { SquareTerminal } from 'lucide-react'
import { contactChannels } from '../data/contact'

export function Contact() {
  return (
    <div className="p-8">
      <div className="max-w-2xl overflow-hidden rounded border border-border">
        <div className="flex items-center gap-2 border-b border-border bg-sidebar px-4 py-2 text-muted">
          <SquareTerminal size={15} />
          <span className="font-mono text-xs">bash</span>
        </div>

        <div className="bg-editor p-4 font-mono text-sm">
          <p className="text-fg">
            <span className="text-string">$</span> contact --iván-sanz
          </p>

          <div className="mt-3 space-y-1.5">
            {contactChannels.map((channel) => (
              <p key={channel.label}>
                <span className="text-accent">→</span>{' '}
                <span className="inline-block w-20 text-type">
                  {channel.label}
                </span>
                {channel.external ? (
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-string hover:underline"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <a href={channel.href} className="text-string hover:underline">
                    {channel.value}
                  </a>
                )}
              </p>
            ))}
          </div>

          <p className="mt-3 flex items-center">
            <span className="text-accent">$</span>
            <span
              aria-hidden="true"
              className="terminal-cursor ml-2 inline-block h-4 w-2 bg-fg"
            />
          </p>
        </div>
      </div>
    </div>
  )
}
