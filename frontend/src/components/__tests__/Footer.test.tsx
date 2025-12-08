import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders GitHub link with correct href', () => {
    render(<Footer />)
    const link = screen.getByLabelText(/visit my github profile/i)
    expect(link).toHaveAttribute('href', 'https://github.com/AloyBranCheung')
  })

  it('renders LinkedIn link with correct href', () => {
    render(<Footer />)
    const links = screen.getAllByLabelText(/visit my linkedin profile/i)
    expect(links[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/aloysiuscheung/')
  })

  it('renders error page links', () => {
    render(<Footer />)
    const errorLinks = screen.getAllByRole('link', { name: /error 500/i })
    const notFoundLinks = screen.getAllByRole('link', { name: /notfound 404/i })
    expect(errorLinks[0]).toHaveAttribute('href', '/error')
    expect(notFoundLinks[0]).toHaveAttribute('href', '/not-found')
  })
})
