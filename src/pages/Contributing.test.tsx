import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { contributingSections } from '../data/contributing'
import { Contributing } from './Contributing'

describe('Contributing', () => {
  it('renders every section heading and body', () => {
    render(<Contributing />)

    expect(
      screen.getByRole('heading', { name: /Contributing/ }),
    ).toBeInTheDocument()

    for (const section of contributingSections) {
      expect(screen.getByText(section.heading)).toBeInTheDocument()
      expect(screen.getByText(section.body)).toBeInTheDocument()
    }
  })
})
