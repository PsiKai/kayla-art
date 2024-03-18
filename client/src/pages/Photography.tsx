import { Link } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import { useEffect, useState } from "react"

function Photography() {
  const [pending, setPending] = useState(false)
  const [artworks, setArtworks] = useState<TArtWork[]>([])

  useEffect(() => {
    setPending(true)
    fetch("/api/artworks/photography")
      .then(data => {
        if (!data.ok) {
          throw new Error("Network response was not ok")
        }
        return data.json()
      })
      .then(({ artwork }) => {
        setArtworks(artwork)
      })
      .catch(err => console.log(err))
      .finally(() => setPending(false))
  }, [])

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
