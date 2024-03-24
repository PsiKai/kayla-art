import { Link } from "react-router-dom"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { TArtWork } from "../context/AppContext"

function Illustration() {
  const [artworks, pending] = useFetchOnRender<TArtWork[]>("/api/artworks/illustration")

  return (
    <>
      <h1>Illustration Page</h1>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {artworks.map(art => (
            <Link to={art.subcategory}>{art.subcategory}</Link>
          ))}
          <Link to="digital">Digital</Link>
          <Link to="traditional">Traditional</Link>
        </>
      )}
    </>
  )
}

export default Illustration
