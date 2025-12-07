import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchHero, fetchExperience } from '../fetch-hompage'
import axios from '@/lib/axios'
import * as Sentry from '@sentry/browser'

vi.mock('@/lib/axios')
vi.mock('@sentry/browser')

describe('fetchHero', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns data on success', async () => {
    const mockData = {
      description: { root: {} },
      'typing-text': [{ text: 'Hello' }]
    }
    vi.mocked(axios.get).mockResolvedValue({ data: mockData })

    const result = await fetchHero()
    expect(result).toEqual({
      richText: mockData.description,
      typingText: mockData['typing-text']
    })
  })

  it('returns null on error', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('API error'))

    const result = await fetchHero()
    expect(result).toBeNull()
  })

  it('captures Sentry exception on error', async () => {
    const error = new Error('API error')
    vi.mocked(axios.get).mockRejectedValue(error)

    await fetchHero()
    expect(Sentry.captureException).toHaveBeenCalledWith(error)
  })
})

describe('fetchExperience', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns docs array on success', async () => {
    const mockDocs = [{ id: 1, title: 'Job 1' }]
    vi.mocked(axios.get).mockResolvedValue({ data: { docs: mockDocs } })

    const result = await fetchExperience()
    expect(result).toEqual(mockDocs)
  })

  it('returns null on error', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('API error'))

    const result = await fetchExperience()
    expect(result).toBeNull()
  })

  it('handles missing docs field', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: {} })

    const result = await fetchExperience()
    expect(result).toEqual({})
  })

  it('captures Sentry exception on error', async () => {
    const error = new Error('API error')
    vi.mocked(axios.get).mockRejectedValue(error)

    await fetchExperience()
    expect(Sentry.captureException).toHaveBeenCalledWith(error)
  })
})
