import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Experience } from './Experience'

/** Simulated entries, independent of the real data — the first one deliberately has no
 * logoUrl, so the missing-logo placeholder test doesn't depend on real data happening
 * to lack a logo for its most recent entry. */
vi.mock('../data/experience', () => ({
  experienceEntries: [
    {
      id: 'no-logo-co',
      role: 'Role One',
      company: 'No Logo Co',
      dateRange: '2025 — Actualmente',
      description: 'Descripción de la entrada sin logo.',
      tasks: ['Tarea uno'],
      stack: ['TypeScript'],
    },
    {
      id: 'second-co',
      role: 'Role Two',
      company: 'Second Co',
      dateRange: '2023 — 2025',
      description: 'Descripción de la segunda entrada.',
      tasks: ['Tarea dos'],
      stack: ['TypeScript'],
    },
  ],
}))

const { experienceEntries } = await import('../data/experience')
const mostRecent = experienceEntries[0]
const secondMostRecent = experienceEntries[1]

describe('Experience', () => {
  it('expands the most recent entry by default', () => {
    render(<Experience />)

    expect(screen.getByText(mostRecent.description)).toBeInTheDocument()
    expect(
      screen.getByLabelText(`Colapsar ${mostRecent.company}`),
    ).toBeInTheDocument()
  })

  it('collapses every other entry by default', () => {
    render(<Experience />)

    expect(
      screen.queryByText(secondMostRecent.description),
    ).not.toBeInTheDocument()
    expect(
      screen.getByLabelText(`Expandir ${secondMostRecent.company}`),
    ).toBeInTheDocument()
  })

  it('expands and collapses an entry when "···" is clicked', () => {
    render(<Experience />)

    const toggle = screen.getByLabelText(`Expandir ${secondMostRecent.company}`)
    fireEvent.click(toggle)

    expect(screen.getByText(secondMostRecent.description)).toBeInTheDocument()
    expect(
      screen.getByLabelText(`Colapsar ${secondMostRecent.company}`),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText(`Colapsar ${secondMostRecent.company}`))

    expect(
      screen.queryByText(secondMostRecent.description),
    ).not.toBeInTheDocument()
  })

  it('expands when clicking anywhere in the row header, not just the "···" icon', () => {
    render(<Experience />)

    fireEvent.click(screen.getByText(secondMostRecent.role))

    expect(screen.getByText(secondMostRecent.description)).toBeInTheDocument()
  })

  it('shows a missing-logo placeholder for entries without a real logo file', () => {
    render(<Experience />)

    expect(
      screen.getByLabelText(`Logo de ${mostRecent.company} no disponible`),
    ).toBeInTheDocument()
  })
})
