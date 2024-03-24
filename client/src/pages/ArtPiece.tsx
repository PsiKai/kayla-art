import { useParams } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { titleCase } from "../utils/stringUtils"

export default function ArtPiece() {
  const { artCollection, artwork } = useParams()
  const [artPiece, pending] = useFetchOnRender<TArtWork>(`/api/artworks/${artwork}`)

  return (
    <>
      <h1>ArtPiece</h1>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          <img src={artPiece?.thumbnail} alt={`An artwork from the ${titleCase(artCollection)}`} />
        </>
      )}
    </>
  )
}
