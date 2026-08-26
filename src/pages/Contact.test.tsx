import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Contact } from './Contact'

describe('Contact', () => {
  it('renders the email link as a mailto without target/rel', () => {
    render(<Contact />)

    const emailLink = screen.getByRole('link', {
      name: 'isanzarenal@gmail.com',
    })
    expect(emailLink).toHaveAttribute('href', 'mailto:isanzarenal@gmail.com')
    expect(emailLink).not.toHaveAttribute('target')
    expect(emailLink).not.toHaveAttribute('rel')
  })

  it('renders the linkedin link opening in a new tab', () => {
    render(<Contact />)

    const linkedinLink = screen.getByRole('link', {
      name: '/in/ivan-sanz-arenal',
    })
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ivan-sanz-arenal/',
    )
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the github link opening in a new tab', () => {
    render(<Contact />)

    const githubLink = screen.getByRole('link', { name: '/isanzarenal' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/isanzarenal')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
