import { useParams, Link } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"

function Collection() {
  const { category, subCategory, collection } = useParams()

  const [artCollection, pending] = useFetchOnRender<TArtWork[]>(
    `/api/artworks?category=${category}&subCategory=${subCategory}&collection=${collection}`,
  )

  if (/^photography|illustration$/.test(category!) === false) {
    return <div>Category not found</div>
  }

  return (
    <>
      <h1>Category: {category}</h1>
      <h2>Subcategory: {subCategory}</h2>
      <h3>Collection: {collection}</h3>
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
