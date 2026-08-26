import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../App'

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('dynamic tabs', () => {
  it('opens about.md by default and opens a new tab when a sidebar file is clicked', async () => {
    renderApp()

    const sidebar = screen.getByLabelText('Explorador de archivos')
    const tabBar = screen.getByLabelText('Pestañas abiertas')

    expect(await within(tabBar).findByText('about.md')).toBeInTheDocument()
    expect(within(tabBar).queryByText('skills.json')).not.toBeInTheDocument()

    fireEvent.click(within(sidebar).getByText('skills.json'))

    expect(await within(tabBar).findByText('skills.json')).toBeInTheDocument()
    expect(
      screen.getByRole('group', { name: '@Core' }),
    ).toBeInTheDocument()

    // clicking the same file again must not duplicate its tab
    fireEvent.click(within(sidebar).getByText('skills.json'))
    expect(within(tabBar).getAllByText('skills.json')).toHaveLength(1)
  })

  it('activates the left-neighbor tab when closing the active tab, and shows the empty state when the last tab closes', async () => {
    renderApp()

    const sidebar = screen.getByLabelText('Explorador de archivos')
    const tabBar = screen.getByLabelText('Pestañas abiertas')

    await within(tabBar).findByText('about.md')
    fireEvent.click(within(sidebar).getByText('skills.json'))
    await within(tabBar).findByText('skills.json')

    // active tab is skills.json (rightmost); closing it should re-activate about.md, its left neighbor
    fireEvent.click(
      within(tabBar).getByRole('button', { name: 'Cerrar skills.json' }),
    )

    expect(within(tabBar).queryByText('skills.json')).not.toBeInTheDocument()
    expect(
      await screen.findByRole('heading', { name: /Iván Sanz/ }),
    ).toBeInTheDocument()

    // closing the only remaining tab should fall back to the empty state
    fireEvent.click(
      within(tabBar).getByRole('button', { name: 'Cerrar about.md' }),
    )

    expect(within(tabBar).queryByText('about.md')).not.toBeInTheDocument()
    expect(
      await screen.findByText(/ningún archivo abierto/),
    ).toBeInTheDocument()
  })

  it('opens resume.pdf as an external link in a new browser tab, not as an internal editor tab', () => {
    renderApp()

    const sidebar = screen.getByLabelText('Explorador de archivos')
    const tabBar = screen.getByLabelText('Pestañas abiertas')
    const resumeLink = within(sidebar).getByText('resume.pdf').closest('a')

    expect(resumeLink).toHaveAttribute(
      'href',
      `${import.meta.env.BASE_URL}resume.pdf`,
    )
    expect(resumeLink).toHaveAttribute('target', '_blank')
    expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer')

    fireEvent.click(resumeLink!)

    expect(within(tabBar).queryByText('resume.pdf')).not.toBeInTheDocument()
  })
})
