import { useMemo } from "react"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { TArtWork } from "../context/AppContext"
import "../styles/ThumbnailContainer.css"

export type TThumbnailContainerProps = {
  category?: string
  subCategory?: string
  artCollection?: string
  limit?: string
}

function ThumbnailContainer(props: TThumbnailContainerProps) {
  const { category, subCategory, artCollection, limit } = props
  const serializedURL = useMemo(() => {
    const params: TThumbnailContainerProps = {
      category,
      subCategory,
      artCollection,
      limit,
    }
    for (const key in params) {
      if (!params[key as keyof TThumbnailContainerProps]) {
        delete params[key as keyof TThumbnailContainerProps]
      }
    }
    const queryParams = new URLSearchParams(params)
    const url = `/api/artworks?${queryParams.toString()}`
    return url
  }, [category, subCategory, artCollection, limit])

  const [thumbnails, pending] = useFetchOnRender<TArtWork[]>(serializedURL)

  return (
    <>
      {pending ? (
        <div className="thumbnail-skeleton">Loading...</div>
      ) : (
        <div className="thumbnail-container">
          {thumbnails.map(thumbnail => (
            <img
              key={thumbnail._id}
              src={thumbnail.thumbnail}
              alt={`An artwork from the collection`}
              className="thumbnail-img"
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ThumbnailContainer
