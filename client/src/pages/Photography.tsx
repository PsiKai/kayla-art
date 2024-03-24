import { Link } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"

function Photography() {
  const [artworks, pending] = useFetchOnRender<TArtWork[]>("/api/artworks/photography")

  return (
    <>
      <h1>Photography Page</h1>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {artworks.map(art => (
            <Link key={art._id} to={art.subCategory}>
              {art.subCategory}
            </Link>
          ))}
          <Link to="landscape">Landscape</Link>
          <Link to="portraits">Portraits</Link>
        </>
      )}
    </>
  )
}

export default Photography
