import { useParams, Link } from "react-router-dom"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { titleCase } from "../utils/stringUtils"
import withValidPath from "../components/hoc/withValidPath"
import withBreadcrumbs from "../components/hoc/withBreadcrumb"
import Loading from "../components/layout/Loading"
import { TArtWork } from "../core-types"

function Collection() {
  const { category, subCategory, artCollection } = useParams()

  const [collection, pending] = useFetchOnRender<TArtWork[]>(
    `/api/artworks?category=${category}&subCategory=${subCategory}&artCollection=${artCollection}`,
  )

  return (
    <>
      <h1>{titleCase(category)}</h1>
      <h2>{titleCase(subCategory)}</h2>
      <h3>{titleCase(artCollection)}</h3>
      {pending ? (
        <Loading />
      ) : (
        collection.map(art => (
          <Link to={art._id} key={art._id}>
            <img
              src={art.thumbnails.small}
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
