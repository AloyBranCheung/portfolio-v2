import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TechStack from '../TechStack'
import type { TechStackItem } from '@/types/tech-stack'

const mockData: TechStackItem[] = [
  {
    id: '2',
    name: 'React',
    order: 0,
    icon: { id: 'i2', alt: 'React logo', url: '/api/media/file/react.svg' },
    category: { id: 'c2', name: 'Frameworks', order: 1 },
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '1',
    name: 'Python',
    order: 0,
    icon: { id: 'i1', alt: 'Python logo', url: '/api/media/file/python.svg' },
    category: { id: 'c1', name: 'Languages', order: 0 },
    createdAt: '',
    updatedAt: '',
  },
]

describe('TechStack', () => {
  it('renders nothing when data is null', () => {
    const { container } = render(<TechStack data={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when data is empty', () => {
    const { container } = render(<TechStack data={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the section heading', () => {
    render(<TechStack data={mockData} />)
    expect(
      screen.getByRole('heading', { level: 2, name: /Languages & Technologies/i }),
    ).toBeInTheDocument()
  })

  it('renders a heading per category', () => {
    render(<TechStack data={mockData} />)
    expect(screen.getByRole('heading', { level: 3, name: 'Languages' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Frameworks' })).toBeInTheDocument()
  })

  it('orders categories by category.order', () => {
    render(<TechStack data={mockData} />)
    const categoryHeadings = screen
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent)
    expect(categoryHeadings).toEqual(['Languages', 'Frameworks'])
  })

  it('renders each icon with its alt text', () => {
    render(<TechStack data={mockData} />)
    expect(screen.getByAltText('Python logo')).toBeInTheDocument()
    expect(screen.getByAltText('React logo')).toBeInTheDocument()
  })

  it('renders each item name', () => {
    render(<TechStack data={mockData} />)
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })
})
