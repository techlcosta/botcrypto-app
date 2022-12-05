import { useLocation } from 'react-router-dom'

export function useGetQuery (query: string): number {
  const pageNumber = new URLSearchParams(useLocation().search).get(query)
  if (pageNumber) {
    return Number(pageNumber)
  } else {
    return 1
  }
}
