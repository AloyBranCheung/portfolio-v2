import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Navbar from '../Navbar'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/'
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() })
}))

vi.mock('@/lib/mixpanel', () => ({
  initMixpanel: vi.fn()
}))

describe('Navbar', () => {
  it('renders brand name and title', () => {
    render(<Navbar />)
    expect(screen.getByText('Brandon Cheung')).toBeInTheDocument()
    expect(screen.getByText('Software Developer')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<Navbar />)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Experience').length).toBeGreaterThan(0)
  })

  it('opens mobile menu on hamburger click', async () => {
    render(<Navbar />)
    const hamburger = screen.getByLabelText(/open navigation menu/i)
    await userEvent.click(hamburger)
    expect(screen.getByText('Navigation Menu')).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })
})
