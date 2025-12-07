import { renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useIsMobile } from '../use-mobile'

describe('useIsMobile', () => {
  let matchMediaMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    matchMediaMock = vi.fn()
    window.matchMedia = matchMediaMock
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns true for mobile widths', () => {
    const listeners: ((e: MediaQueryListEvent) => void)[] = []
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn((_, cb) => listeners.push(cb)),
      removeEventListener: vi.fn()
    })
    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('returns false for desktop widths', () => {
    const listeners: ((e: MediaQueryListEvent) => void)[] = []
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn((_, cb) => listeners.push(cb)),
      removeEventListener: vi.fn()
    })
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })
})
