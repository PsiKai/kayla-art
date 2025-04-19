/* global NodeJS */
import { useEffect, useRef, useState } from "react"
import useDebounce from "./useDebounce"

type TFetchResult<T> = [T, boolean]

export default function useFetchWithDebounce<T>(url: string): TFetchResult<T> {
  const [data, setData] = useState<T | undefined>()
  const [pending, setPending] = useState(true)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  const debounce = useDebounce(500)

  useEffect(() => {
    clearTimeout(debounceTimer.current!)
    setPending(true)

    function fetchData() {
      fetch(url)
        .then(res => {
          if (!res.ok) {
            throw new Error("Network response was not ok")
          }
          return res.json()
        })
        .then(({ resources }) => {
          setData(resources as T)
        })
        .catch(err => console.log(err))
        .finally(() => setPending(false))
    }

    debounce(fetchData)
  }, [url, debounce])

  return [data!, pending]
}
