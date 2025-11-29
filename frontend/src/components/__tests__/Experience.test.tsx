import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Experience from '../Experience'

describe('Experience', () => {
  it('renders ErrorMsg when data is null', () => {
    render(<Experience data={null} />)
    expect(screen.getByText(/Oops...something went wrong/i)).toBeInTheDocument()
  })
})
