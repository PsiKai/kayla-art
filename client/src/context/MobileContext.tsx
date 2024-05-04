import { createContext, useEffect, useRef, useState } from "react"

type MobileContextType = {
  isMobile: boolean
  navbarRef: React.RefObject<HTMLElement>
}

export const MobileContext = createContext<MobileContextType | undefined>(undefined)

export const MobileProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const navbarRef = useRef<HTMLElement>(null)

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
