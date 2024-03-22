import { useEffect, useState } from "react"

type TFetchResult<T> = [T, boolean]

export default function useFetchOnRender<T>(url: string): TFetchResult<T> {
  const [data, setData] = useState<T | undefined>()
  const [pending, setPending] = useState(true)

  useEffect(() => {
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
  }, [url])

  return [data!, pending]
}
