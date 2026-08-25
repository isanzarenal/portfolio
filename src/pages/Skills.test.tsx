import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { skillCategories } from '../data/skills'
import { Skills } from './Skills'

describe('Skills', () => {
  it('renders every technology inside its own category group', () => {
    render(<Skills />)

    for (const category of skillCategories) {
      const group = screen.getByRole('group', { name: category.annotation })

      for (const tech of category.technologies) {
        expect(within(group).getByText(tech)).toBeInTheDocument()
      }
    }
  })

  it('does not leak technologies across categories', () => {
    render(<Skills />)

    const coreGroup = screen.getByRole('group', { name: '@Core' })
    const legacyGroup = screen.getByRole('group', { name: '@Legacy' })

    expect(within(coreGroup).queryByText('Struts 2')).not.toBeInTheDocument()
    expect(within(legacyGroup).queryByText('Java 8-21')).not.toBeInTheDocument()
  })

  it('shows a one-line context note for @Sandbox, @Standby and @Legacy, and none for the rest', () => {
    render(<Skills />)

    for (const category of skillCategories) {
      const group = screen.getByRole('group', { name: category.annotation })
      if (category.note) {
        expect(within(group).getByText(category.note)).toBeInTheDocument()
      } else {
        expect(within(group).queryByText(/^\/\//)).not.toBeInTheDocument()
      }
    }
  })
})
