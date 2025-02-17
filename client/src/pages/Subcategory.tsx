import { useMemo } from "react"
import { useParams } from "react-router-dom"
import useFetchOnRender from "../hooks/useFetchOnRender"
import { titleCase } from "../utils/stringUtils"
// import withValidPath from "../components/hoc/withValidPath"
// import withBreadcrumbs from "../components/hoc/withBreadcrumb"
import { heroMap } from "../utils/fallbackImages"
import { TArtWork } from "../context/AppContext"
import ImageThumbnail from "../components/layout/ImageThumbnail"

export function Subcategory() {
  const { category, subCategory } = useParams()

  const [artwork, pending] = useFetchOnRender<TArtWork[]>(
    `/api/artworks/categories/${category}/subcategories/${subCategory}`,
  )

  const hero = useMemo(() => artwork?.find(art => art.role === "hero"), [artwork])
  const gallery = useMemo(() => artwork?.filter(art => art.role === "gallery"), [artwork])
  console.log({ category, subCategory })
  const fallbackHero = heroMap[category!]?.[subCategory!].main || { src: "", alt: "" }

  if (pending) return <div>Loading...</div>

  return (
    <>
      <div className="hero-image-container">
        <img
          className="hero-image"
          src={hero?.thumbnails["1440"] || fallbackHero.src}
          alt={`A hero image for the ${subCategory} album`}
        />
        <div className="hero-text glass">
          <h1>
            {titleCase(category)} {titleCase(subCategory)}
          </h1>
        </div>
      </div>
      {gallery.length ? (
        gallery.map(artwork => <ImageThumbnail image={artwork} />)
      ) : (
        <p>No artwork from this category in the gallery</p>
      )}
    </>
  )
}

// const ValidPathSubcategory = withValidPath(Subcategory)
//
// const BreadcrumbedSubcategory = withBreadcrumbs(ValidPathSubcategory)
//
// export default BreadcrumbedSubcategory
