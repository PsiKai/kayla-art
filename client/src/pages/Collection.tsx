import { useParams, Link } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { titleCase } from "../utils/stringUtils"
import withValidPath from "../components/hoc/withValidPath"
import withBreadcrumbs from "../components/hoc/withBreadcrumb"

function Collection() {
  const { category, subCategory, artCollection } = useParams()

  const [collection, pending] = useFetchOnRender<TArtWork[]>(
    `/api/artworks?category=${category}&subCategory=${subCategory}&artCollection=${artCollection}`,
  )

  return (
    <>
      <h1>Category: {titleCase(category)}</h1>
      <h2>Subcategory: {titleCase(subCategory)}</h2>
      <h3>Collection: {titleCase(artCollection)}</h3>
      {pending ? (
        <div>Loading...</div>
      ) : (
        collection.map(art => (
          <Link to={art._id} key={art._id}>
            <img
              src={art.thumbnail}
              alt={`An artwork from the ${titleCase(artCollection)} collection`}
            />
          </Link>
        ))
      )}
    </>
  )
}

const ValidPathCollection = withValidPath(Collection)

const BreadcrumbedCollection = withBreadcrumbs(ValidPathCollection)

export default BreadcrumbedCollection
