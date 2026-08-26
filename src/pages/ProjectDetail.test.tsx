import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { ProjectDetail } from './ProjectDetail'

/** Simulated projects, independent of the real data — exercises the demoUrl-conditional
 * button without depending on whether any real project happens to have a demo yet. */
vi.mock('../data/projects', () => ({
  projects: [
    {
      fileName: 'noDemo.ts',
      title: 'No Demo Project',
      status: 'finished',
      description: 'Proyecto de prueba sin demo.',
      stack: ['TypeScript'],
      repoUrl: 'https://github.com/isanzarenal/no-demo',
    },
    {
      fileName: 'withDemo.ts',
      title: 'With Demo Project',
      status: 'in-progress',
      description: 'Proyecto de prueba con demo.',
      stack: ['TypeScript'],
      repoUrl: 'https://github.com/isanzarenal/with-demo',
      demoUrl: 'https://youtube.com/watch?v=demo',
    },
  ],
}))

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:fileName" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProjectDetail', () => {
  it('does not render the demo button when demoUrl is undefined', () => {
    renderAt('/projects/noDemo.ts')

    expect(screen.getByText('No Demo Project')).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /ver demo completa/i }),
    ).not.toBeInTheDocument()
  })

  it('renders the demo button when demoUrl is defined', () => {
    renderAt('/projects/withDemo.ts')

    const demoLink = screen.getByRole('link', { name: /ver demo completa/i })
    expect(demoLink).toHaveAttribute('href', 'https://youtube.com/watch?v=demo')
  })

  it('always shows the repository button with the correct url', () => {
    renderAt('/projects/noDemo.ts')

    const repoLink = screen.getByRole('link', { name: /ver repositorio/i })
    expect(repoLink).toHaveAttribute(
      'href',
      'https://github.com/isanzarenal/no-demo',
    )
  })
})
