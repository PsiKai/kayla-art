import React, { createContext } from "react"

type MobileContextType = {
  isMobile: boolean
  navbarRef: React.RefObject<HTMLElement> | null
}

const initialMobileContext: MobileContextType = {
  isMobile: false,
  navbarRef: null,
}

export const MobileContext = createContext<MobileContextType>(initialMobileContext)
