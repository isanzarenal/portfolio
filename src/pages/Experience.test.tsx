import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { experienceEntries } from '../data/experience'
import { Experience } from './Experience'

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
