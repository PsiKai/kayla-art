import { useParams } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { titleCase } from "../utils/stringUtils"
import withValidPath from "../components/hoc/withValidPath"
import withBreadcrumbs from "../components/hoc/withBreadcrumb"

function ArtPiece() {
  const { artCollection, artwork } = useParams()
  const [artPiece, pending] = useFetchOnRender<TArtWork & { originalSrc: string }>(
    `/api/artworks/${artwork}`,
  )

  return (
    <>
      <h1>ArtPiece</h1>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          <img
            src={artPiece?.originalSrc}
            alt={`An artwork from the ${titleCase(artCollection)}`}
          />
        </>
      )}
    </>
  )
}

const ValidPathArtPiece = withValidPath(ArtPiece)

const BreadCrumbArtPiece = withBreadcrumbs(ValidPathArtPiece)

export default BreadCrumbArtPiece
