import { useParams } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"

export default function ArtPiece() {
  const { category, subcategory, collection, artwork } = useParams()
  const [artPiece, pending] = useFetchOnRender<TArtWork>(
    `/api/artworks/${category}/subcategories/${subcategory}/collections/${collection}/artworks/${artwork}`,
  )

  return (
    <>
      <h1>ArtPiece</h1>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          <img src={artPiece?.thumbnail} alt="An artwork" />
        </>
      )}
    </>
  )
}