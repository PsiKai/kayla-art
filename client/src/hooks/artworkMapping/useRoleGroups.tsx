import { useMemo } from "react"
import { TArtWork } from "../../context/AppContext"

export function useRoleGroups(art: TArtWork[]) {
  const groups = useMemo(() => {
    return art.reduce<{
      hero: TArtWork[]
      carousel: TArtWork[]
      main: TArtWork[]
      gallery: TArtWork[]
    }>(
      (acc, artwork) => {
        acc[artwork.role].push(artwork)
        return acc
      },
      { hero: [], carousel: [], main: [], gallery: [] },
    )
  }, [art])

  return groups
}
