import { useMemo } from "react"
import { ValidHeroMapRoles } from "../../utils/fallbackImages"
import { useFallbackHero } from "../../hooks/artworkMapping/useFallbackHero"
import { TArtWork } from "../../core-types"

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
    [mainSectionImageMap, fallBackHero.src, key],
  )
  const alt = useMemo(
    () => mainSectionImageMap[key]?.alt || fallBackHero.alt,
    [mainSectionImageMap, fallBackHero.alt, key],
  )

  return <img className="hero-image" src={src} alt={alt} />
}
