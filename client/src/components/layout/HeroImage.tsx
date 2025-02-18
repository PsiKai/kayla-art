import { useMemo } from "react"
import { TArtWork } from "../../context/AppContext"
import { heroMap, ValidHeroMapRoles } from "../../utils/fallbackImages"

export function HeroImage({
  category,
  subCategory,
  role,
  mainSectionImageMap = {},
}: {
  category: TArtWork["category"]
  subCategory: string
  role: ValidHeroMapRoles
  mainSectionImageMap: Record<string, { src: string; alt: string }>
}) {
  const key = `${category}/${subCategory}`
  const src = useMemo(
    () => mainSectionImageMap[key]?.src || heroMap[category][subCategory][role].src,
    [category, subCategory, mainSectionImageMap],
  )
  const alt = useMemo(
    () => mainSectionImageMap[key]?.alt || heroMap[category][subCategory][role].alt,
    [category, subCategory, mainSectionImageMap],
  )

  return <img className="hero-image" src={src} alt={alt} />
}
