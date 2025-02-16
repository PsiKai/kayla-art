import { useCallback, useMemo, useRef } from "react"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { TArtWork } from "../context/AppContext"
import "../styles/ThumbnailContainer.css"
import useIntersectionObserver from "../hooks/useIntersectionObserver"

export type TThumbnailContainerProps = {
  category?: string
  subCategory?: string
  artCollection?: string
  limit?: string
}

function ThumbnailContainer(props: TThumbnailContainerProps) {
  const serializedURL = useMemo(() => {
    return `/api/artworks?${new URLSearchParams(props).toString()}`
  }, [props])

  const containerRef = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver(containerRef)
  const [thumbnails, pending] = useFetchOnRender<TArtWork[]>(serializedURL, !isIntersecting)

  const calculatedGridPosition = useCallback(
    (i: number) => {
      if (thumbnails?.length === 1) return { gridColumn: "2 / span 10", gridRow: "span 6" }

      switch (i) {
        case 0:
        case 1:
          return { gridColumn: "span 6", gridRow: "span 5" }
        case 2:
        case 3:
        case 4:
          return { gridColumn: "span 4", gridRow: "span 3" }
        default:
          return {}
      }
    },
    [thumbnails],
  )

  return (
    <div className="thumbnail-grid-wrapper" ref={containerRef}>
      {pending || !isIntersecting ? (
        <div className="thumbnail-skeleton">
          {[...Array(props.limit ?? 5)].map((_, i) => (
            <div className="img-skeleton" key={i} style={calculatedGridPosition(i)} />
          ))}
        </div>
      ) : (
        <div className="thumbnail-container">
          {thumbnails.map((thumbnail, i) => (
            <div className="thumbnail-img" style={calculatedGridPosition(i)}>
              <img
                key={thumbnail._id}
                src={thumbnail.thumbnails.small}
                alt={`An artwork from the ${thumbnail.artCollection} collection`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThumbnailContainer
