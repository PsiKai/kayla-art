import { Link } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"

function Photography() {
  const [artworks, pending] = useFetchOnRender<TArtWork[]>("/api/artworks/photography")

  return (
    <>
      <div>Photography Page</div>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {artworks.map(art => (
            <Link to={art.subcategory}>{art.subcategory}</Link>
          ))}
          <Link to="landscape">Landscape</Link>
          <Link to="portraits">Portraits</Link>
        </>
      )}
    </>
  )
}

export default Photography
