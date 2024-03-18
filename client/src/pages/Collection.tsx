import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { TArtWork } from "../context/AppContext"

function Collection() {
  const { category, subcategory, collection } = useParams()
  const [artCollection, setCollection] = useState<TArtWork[]>([])
  const [pending, setPending] = useState(false)

  useEffect(() => {
    setPending(true)
    fetch(`/api/artworks/${category}/${subcategory}`)
      .then(data => {
        if (!data.ok) {
          throw new Error("Network response was not ok")
        }
        return data.json()
      })
      .then(({ artwork }) => {
        setCollection(artwork)
      })
      .catch(err => console.log(err))
      .finally(() => setPending(false))
  }, [category, subcategory])

  if (/^photography|illustration$/.test(category!) === false) {
    return <div>Category not found</div>
  }

  return (
    <>
      <div>Category: {category}</div>
      <div>Subcategory: {subcategory}</div>
      <div>Collection: {collection}</div>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {artCollection.map(art => (
            <Link to={art._id}>
              <img src={art.thumbnail} alt={`An artwork from the ${collection} collection`} />
            </Link>
          ))}
          <Link to="sample-artwork">
            <img src="https://picsum.photos/200/300" alt="A sample artwork" />
          </Link>
          <Link to="sample-artwork">
            <img src="https://picsum.photos/300/300" alt="A sample artwork" />
          </Link>
        </>
      )}
    </>
  )
}

export default Collection
