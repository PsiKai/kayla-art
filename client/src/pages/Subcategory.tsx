import { Link, useParams } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { titleCase } from "../utils/stringUtils"
import withValidPath from "../components/hoc/withValidPath"

function Subcategory() {
  const { category, subCategory } = useParams()

  const [subcategories, pending] = useFetchOnRender<TArtWork[]>(
    `/api/artworks?category=${category}&subCategory=${subCategory}`,
  )

  return (
    <>
      <h1>Category: {titleCase(category)}</h1>
      <h2>Subcategory: {titleCase(subCategory)}</h2>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {subcategories.map(subcategory => (
            <Link key={subcategory._id} to={subcategory.artCollection}>
              {titleCase(subcategory.artCollection)}
            </Link>
          ))}
          <Link to="sample-collection">Sample Collection</Link>
          <Link to="another-collection">Another Collection</Link>
        </>
      )}
    </>
  )
}

const ValidPathSubcategory = withValidPath(Subcategory)

export default ValidPathSubcategory
