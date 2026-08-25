import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { aboutStack } from '../data/about'
import { About } from './About'

describe('About', () => {
  it('renders the name, the intro text and the stack block', () => {
    render(<About />)

    expect(
      screen.getByRole('heading', { name: /Iván Sanz/ }),
    ).toBeInTheDocument()

    expect(screen.getByText(/Software engineer con/)).toBeInTheDocument()
    expect(screen.getByText(/Tech Lead/)).toBeInTheDocument()

    for (const [category, technologies] of Object.entries(aboutStack)) {
      expect(screen.getByText(`"${category}"`)).toBeInTheDocument()
      for (const tech of technologies) {
        expect(screen.getByText(`"${tech}"`)).toBeInTheDocument()
      }
    }
  })
})
