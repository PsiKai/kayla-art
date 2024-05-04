import { useContext } from "react"
import { MobileContext } from "../context/MobileContext"

export const useMobileContext = () => {
  if (!MobileContext) {
    throw new Error("useMobileContext must be used within a MobileProvider")
  }
  const { isMobile, navbarRef } = useContext(MobileContext)!

  return { isMobile, navbarRef }
}
