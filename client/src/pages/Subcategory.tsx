import { Link, useParams } from "react-router-dom"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { titleCase } from "../utils/stringUtils"
import withValidPath from "../components/hoc/withValidPath"
import withBreadcrumbs from "../components/hoc/withBreadcrumb"
import React from "react"
import ThumbnailContainer from "../components/ThumbnailContainer"

function Subcategory() {
  const { category, subCategory } = useParams()

  const [collections, pending] = useFetchOnRender<string[]>(
    `/api/artworks/categories/${category}/subcategories/${subCategory}/collections`,
  )

  return (
    <>
      <h1>Category: {titleCase(category)}</h1>
      <h2>Subcategory: {titleCase(subCategory)}</h2>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {collections.map(collection => (
            <React.Fragment key={collection}>
              <Link to={collection}>{titleCase(collection)}</Link>
              <ThumbnailContainer
                category={category}
                subCategory={subCategory}
                artCollection={collection}
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
