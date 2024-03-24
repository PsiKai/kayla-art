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
            <Link key={art._id} to={art.subCategory}>
              {art.subCategory}
            </Link>
          ))}
          <Link to="digital">Digital</Link>
          <Link to="traditional">Traditional</Link>
        </>
      )}
    </>
  )
}

export default Illustration
