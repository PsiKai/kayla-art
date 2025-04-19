import { useContext, useLayoutEffect, useState } from "react"
import { MobileContext } from "../context/mobileContext"

export const useNavbarOffset = () => {
  if (!MobileContext) {
    throw new Error("useNavbarOffset must be used within a NavbarOffsetProvider")
  }
  const { navbarRef } = useContext(MobileContext)
  const [navbarHeight, setNavbarHeight] = useState(navbarRef?.current?.clientHeight || 0)

  useLayoutEffect(() => {
    if (!navbarRef?.current) return

    const observer = new ResizeObserver(entries => {
      setNavbarHeight(entries[0].contentRect.height)
    })

    observer.observe(navbarRef.current)

    return () => observer.disconnect()
  }, [navbarRef])

  return navbarHeight
}
