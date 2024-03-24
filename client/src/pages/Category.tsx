import { Link, useParams } from "react-router-dom"
import { titleCase } from "../utils/stringUtils"
import useFetchOnRender from "../hooks/useFetchOnRender"
import withValidPath from "../components/hoc/withValidPath"

function Category() {
  const { category } = useParams()

  const [subCategories, pending] = useFetchOnRender<string[]>(
    `/api/artworks/categories/${category}/subcategories`,
  )

  return (
    <>
      <h1>Category: {titleCase(category)}</h1>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {subCategories.map(subCategory => (
            <Link key={subCategory} to={`/${category}/${subCategory}`}>
              {titleCase(subCategory)}
            </Link>
          ))}
        </>
      )}
    </>
  )
}

const ValidPathCategory = withValidPath(Category)

export default ValidPathCategory
