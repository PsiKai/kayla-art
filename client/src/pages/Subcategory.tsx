import { Link, useParams } from "react-router-dom"
import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { titleCase } from "../utils/stringUtils"
import withValidPath from "../components/hoc/withValidPath"
import withBreadcrumbs from "../components/hoc/withBreadcrumb"
import React from "react"
import ThumbnailContainer from "../components/ThumbnailContainer"

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
            <React.Fragment key={subcategory._id}>
              <Link to={subcategory.artCollection}>{titleCase(subcategory.artCollection)}</Link>
              <ThumbnailContainer
                category={category}
                subCategory={subCategory}
                artCollection={subcategory.artCollection}
              />
            </React.Fragment>
          ))}
        </>
      )}
    </>
  )
}

const ValidPathSubcategory = withValidPath(Subcategory)

const BreadcrumbedSubcategory = withBreadcrumbs(ValidPathSubcategory)

export default BreadcrumbedSubcategory
