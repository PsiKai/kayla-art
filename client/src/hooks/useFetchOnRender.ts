import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type TFetchResult<T> = [T, boolean]

export default function useFetchOnRender<T>(url: string): TFetchResult<T> {
  const params = useParams()
  const [data, setData] = useState<T | undefined>()
  const [pending, setPending] = useState(true)

  useEffect(() => {
    setPending(true)
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
  }, [url, params])

  return [data!, pending]
}
