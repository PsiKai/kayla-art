import { useEffect, useMemo, useRef, useState } from "react"
import useFetchOnRender from "../../hooks/useFetchOnRender"
import ImageThumbnail from "./ImageThumbnail"
import useIntersectionObserver from "../../hooks/useIntersectionObserver"
import Loading from "./Loading"
import { TArtWork } from "../../core-types"

type TImageTimelineProps = {
  category?: string
  subCategory?: string
  artCollection?: string
}

function ImageTimeline(props: TImageTimelineProps) {
  const [page, setPage] = useState(0)
  const lastElementRef = useRef<HTMLDivElement>({} as HTMLDivElement)

  const serializedURL = useMemo(() => {
    return `/api/artworks?${new URLSearchParams({ ...props, offset: page.toString() }).toString()}`
  }, [props, page])

  const isIntersecting = useIntersectionObserver(lastElementRef)
  const [images, pending] = useFetchOnRender<TArtWork[]>(serializedURL)

  useEffect(() => {
    console.log("isIntersecting", isIntersecting)
    if (isIntersecting) {
      setPage(prev => prev + 1)
    }
  }, [isIntersecting])

  return (
    <div>
      <h2>Image Timeline</h2>
      {images?.map((image, i) => (
        <div key={image._id} {...(i === images.length - 1 ? { ref: lastElementRef } : {})}>
          <ImageThumbnail image={image} />
        </div>
      ))}
      {pending ? <Loading /> : null}
    </div>
  )
}

export default ImageTimeline
