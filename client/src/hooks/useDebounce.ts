/* global NodeJS */
import { useCallback, useRef } from "react"

export default function useDebounce<T>(wait: number = 500) {
  const timer = useRef<NodeJS.Timeout | null>(null)

  const debounce = useCallback(
    (func: () => T) => {
      clearTimeout(timer.current!)

      timer.current = setTimeout(() => {
        func()
      }, wait)
    },
    [wait],
  )

  return debounce
}
