import React, { useEffect, useRef, useState } from "react"
import { MobileContext } from "./mobileContext"

export const MobileProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const navbarRef = useRef<HTMLElement>({} as HTMLElement)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <MobileContext.Provider value={{ isMobile, navbarRef }}>{children}</MobileContext.Provider>
}
