import { useMemo } from "react"
import { TArtWork } from "../../context/AppContext"
import { heroMap, ValidHeroMapRoles } from "../../utils/fallbackImages"

export function useFallbackHero({
  category,
  subCategory,
  role,
}: Pick<TArtWork, "category" | "subCategory"> & { role: ValidHeroMapRoles }) {
  const subCategoryImages = useMemo(() => heroMap[category][subCategory], [category, subCategory])

  if (!subCategoryImages) return { src: "", alt: "" }

  return subCategoryImages[role]
}
