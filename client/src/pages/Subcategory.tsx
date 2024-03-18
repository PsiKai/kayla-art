import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { TArtWork } from "../context/AppContext"

function Subcategory() {
  const { category, subcategory } = useParams()
  const [subcategories, setSubcategories] = useState<TArtWork[]>([])
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
        setSubcategories(artwork)
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
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {subcategories.map(subcategory => (
            <Link to={subcategory.collection}>{subcategory.collection}</Link>
          ))}
          <Link to="sample-collection">Sample Collection</Link>
          <Link to="another-collection">Another Collection</Link>
        </>
      )}
    </>
  )
}

export default Subcategory
