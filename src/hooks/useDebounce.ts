
import { useCallback, useRef } from 'react'

export function useDebounce (delay = 500) {
  const debouncing = useRef<NodeJS.Timeout>()

  const debounce = useCallback(
    (func: () => Promise<void>) => {
      if (debouncing.current) {
        clearTimeout(debouncing.current)
      }
      debouncing.current = setTimeout(async () => await func(), delay)
    },
    [delay]
  )

  return { debounce }
}
