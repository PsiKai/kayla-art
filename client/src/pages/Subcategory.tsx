import { Link, useParams } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"

function Subcategory() {
  const { category, subcategory } = useParams()

  const [subcategories, pending] = useFetchOnRender<TArtWork[]>(
    `/api/artworks/${category}/subcategories/${subcategory}`,
  )

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
