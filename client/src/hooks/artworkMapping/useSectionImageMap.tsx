import { useMemo } from "react"
import { TArtWork } from "../../context/AppContext"

export function useSectionImageMap(sectionImages: TArtWork[] | undefined) {
  const mainSectionImageMap = useMemo(() => {
    if (!sectionImages) return {}

    return sectionImages.reduce<Record<string, { src: string; alt: string }>>((acc, curr) => {
      const { category, subCategory } = curr
      const key = `${category}/${subCategory}`
      if (!acc[key]) {
        acc[key] = { src: "", alt: "" }
      }
      acc[key] = {
        src: curr.thumbnails.large,
        alt: `An artwork from the ${subCategory} category`,
      }
      return acc
    }, {})
  }, [sectionImages])

  return mainSectionImageMap
}
