import { Link, useParams } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"

function Subcategory() {
  const { category, subCategory } = useParams()

  const [subcategories, pending] = useFetchOnRender<TArtWork[]>(
    `/api/artworks?category=${category}&subCategory=${subCategory}`,
  )

  if (/^photography|illustration$/.test(category!) === false) {
    return <h1>Category not found</h1>
  }

  return (
    <>
      <h1>Category: {category}</h1>
      <h2>Subcategory: {subCategory}</h2>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {subcategories.map(subcategory => (
            <Link key={subcategory._id} to={subcategory.artCollection}>
              {subcategory.artCollection}
            </Link>
          ))}
          <Link to="sample-collection">Sample Collection</Link>
          <Link to="another-collection">Another Collection</Link>
        </>
      )}
    </>
  )
}

export default Subcategory
