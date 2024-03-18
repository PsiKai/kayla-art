import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { TArtWork } from "../context/AppContext"

function Illustration() {
  const [pending, setPending] = useState(false)
  const [artworks, setArtworks] = useState<TArtWork[]>([])

  useEffect(() => {
    setPending(true)
    fetch("/api/artworks/illustration")
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
      <div>Illustration Page</div>
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
