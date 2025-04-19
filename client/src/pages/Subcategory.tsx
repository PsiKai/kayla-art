import useFetchOnRender from "../hooks/useFetchOnRender"
import { titleCase } from "../utils/stringUtils"
import withValidPath from "../components/hoc/withValidPath"
// import withBreadcrumbs from "../components/hoc/withBreadcrumb"
import ImageThumbnail from "../components/layout/ImageThumbnail"
import { useRoleGroups } from "../hooks/artworkMapping/useRoleGroups"
import { useFallbackHero } from "../hooks/artworkMapping/useFallbackHero"
import Loading from "../components/layout/Loading"
import { TArtWork } from "../core-types"

function SubcategoryComponent({
  category,
  subCategory,
}: Pick<TArtWork, "category" | "subCategory">) {
  const [artwork, pending] = useFetchOnRender<TArtWork[]>(
    `/api/artworks/categories/${category}/subcategories/${subCategory}`,
  )
  const { hero, galleryFeed } = useRoleGroups(artwork)
  const fallbackHero = useFallbackHero({ category, subCategory, role: "hero" })
  console.log({ fallbackHero })

  if (pending) return <Loading />

  return (
    <>
      <div className="hero-image-container">
        <img
          className="hero-image"
          src={hero[0]?.thumbnails.large || fallbackHero.src}
          alt={`A hero image for the ${subCategory} album`}
        />
        <div className="hero-text glass">
          <h1>
            {titleCase(category)} {titleCase(subCategory)}
          </h1>
        </div>
      </div>
      {galleryFeed.length ? (
        galleryFeed.map(artwork => <ImageThumbnail key={artwork._id} image={artwork} />)
      ) : (
        <p>No artwork from this category in the gallery</p>
      )}
    </>
  )
}

export const Subcategory = withValidPath(SubcategoryComponent)

// const ValidPathSubcategory = withValidPath(Subcategory)
//
// const BreadcrumbedSubcategory = withBreadcrumbs(ValidPathSubcategory)
//
// export default BreadcrumbedSubcategory
