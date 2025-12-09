import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import GameUI from '../game/GameUI'

describe('GameUI', () => {
  it('renders initial instructions', () => {
    render(<GameUI isGameOver={false} onReset={vi.fn()} score={0} />)
    expect(screen.getByText(/Stack the blocks as high as you can/i)).toBeInTheDocument()
    expect(screen.getByText(/Score: 0/i)).toBeInTheDocument()
  })

  it('shows score when game is active', () => {
    const { container } = render(<GameUI isGameOver={false} onReset={vi.fn()} score={5} />)
    const scores = container.querySelectorAll('p')
    const hasScore = Array.from(scores).some(p => p.textContent === 'Score: 5' && !p.closest('.mt-24'))
    expect(hasScore).toBe(true)
  })

  it('hides active score when game is over', () => {
    const { container } = render(<GameUI isGameOver={true} onReset={vi.fn()} score={5} />)
    const activeScores = container.querySelectorAll('p')
    const hasActiveScore = Array.from(activeScores).some(
      p => p.textContent === 'Score: 5' && !p.closest('.mt-24')
    )
    expect(hasActiveScore).toBe(false)
  })

  it('shows game over modal with score', () => {
    const { container } = render(<GameUI isGameOver={true} onReset={vi.fn()} score={10} />)
    const modal = container.querySelector('.mt-24')
    expect(modal).toBeInTheDocument()
    expect(modal?.textContent).toContain('Game Over')
    expect(modal?.textContent).toContain('Score: 10')
  })

  it('calls onReset when reset button clicked', async () => {
    const onReset = vi.fn()
    const { container } = render(<GameUI isGameOver={true} onReset={onReset} score={5} />)
    const button = container.querySelector('.mt-24 button')
    await userEvent.click(button!)
    expect(onReset).toHaveBeenCalledOnce()
  })
})
