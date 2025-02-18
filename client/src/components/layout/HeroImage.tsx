import { useMemo } from "react"
import { TArtWork } from "../../context/AppContext"
import { ValidHeroMapRoles } from "../../utils/fallbackImages"
import { useFallbackHero } from "../../hooks/artworkMapping/useFallbackHero"

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
  const fallBackHero = useFallbackHero({ category, subCategory, role })
  const key = useMemo(() => `${category}/${subCategory}`, [category, subCategory])
  const src = useMemo(
    () => mainSectionImageMap[key]?.src || fallBackHero.src,
    [category, subCategory, mainSectionImageMap],
  )
  const alt = useMemo(
    () => mainSectionImageMap[key]?.alt || fallBackHero.alt,
    [category, subCategory, mainSectionImageMap],
  )

  return <img className="hero-image" src={src} alt={alt} />
}
