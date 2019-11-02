import { callApi } from '../lib/fetchUtils'

const API_BASE = 'https://en.wikipedia.org/api/rest_v1'

interface WikiPageSummary {
  type: string
  title: string
  extract: string
}

export const getPageSummary = (query: string): Promise<WikiPageSummary> =>
  callApi(`${API_BASE}/page/summary/${query}`)
