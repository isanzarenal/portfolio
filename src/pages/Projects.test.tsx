import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Projects } from './Projects'

/** The row name can be split across a <mark> highlight, so match on the full concatenated text instead of a single text node. */
function queryFileName(name: string) {
  return screen.queryByText(
    (_, element) => element?.tagName === 'SPAN' && element.textContent === name,
  )
}

function getFileName(name: string) {
  const element = queryFileName(name)
  if (!element) throw new Error(`Unable to find file name "${name}"`)
  return element
}

describe('Projects', () => {
  it('lists every project with its file name and status badge', () => {
    render(<Projects />)

    expect(getFileName('portfolio.js')).toBeInTheDocument()
    expect(screen.getByText('in progress')).toBeInTheDocument()
    expect(getFileName('elasticObservabilityLab.java')).toBeInTheDocument()
    expect(screen.getByText('finished')).toBeInTheDocument()
    expect(screen.getByText('2 de 2 resultados')).toBeInTheDocument()
  })

  it('filters by name as the user types', () => {
    render(<Projects />)

    fireEvent.change(screen.getByLabelText('Buscar proyectos'), {
      target: { value: 'portfolio' },
    })

    expect(getFileName('portfolio.js')).toBeInTheDocument()
    expect(queryFileName('elasticObservabilityLab.java')).not.toBeInTheDocument()
    expect(screen.getByText('1 de 2 resultados')).toBeInTheDocument()
  })

  it('filters by technology as the user types', () => {
    render(<Projects />)

    fireEvent.change(screen.getByLabelText('Buscar proyectos'), {
      target: { value: 'kibana' },
    })

    expect(getFileName('elasticObservabilityLab.java')).toBeInTheDocument()
    expect(queryFileName('portfolio.js')).not.toBeInTheDocument()
    expect(screen.getByText('1 de 2 resultados')).toBeInTheDocument()
  })
})
