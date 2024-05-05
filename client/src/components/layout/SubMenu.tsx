import { useCallback, useEffect, useRef, useState } from "react"
import { useMobileContext } from "../../hooks/useMobileContext"
import "../../styles/SubMenu.css"
import { useLocation } from "react-router-dom"

type SubMenuProps = {
  children: React.ReactNode
  title: string
}

function SubMenu({ children, title }: SubMenuProps) {
  const [expanded, setExpanded] = useState(false)
  const { isMobile } = useMobileContext()
  const location = useLocation()
  const mouseLeaveTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setExpanded(false)
  }, [location])

  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget)) return
    setExpanded(false)
  }, [])

  const handleClick = useCallback(() => {
    setExpanded(prev => !prev)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (mouseLeaveTimeout.current) {
      clearTimeout(mouseLeaveTimeout.current)
    }
    setExpanded(true)
  }, [])

  const handleDelayedMouseLeave = useCallback(() => {
    if (mouseLeaveTimeout.current) {
      clearTimeout(mouseLeaveTimeout.current)
    }
    mouseLeaveTimeout.current = setTimeout(() => {
      setExpanded(false)
    }, 300)
  }, [])

  return (
    <div
      className="submenu-container"
      {...(isMobile
        ? {}
        : {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleDelayedMouseLeave,
            onBlur: handleBlur,
          })}
    >
      <button
        className="btn-link submenu-title"
        {...(isMobile ? {} : { onClick: handleClick })}
        aria-expanded={expanded || isMobile}
      >
        {title}
      </button>
      {expanded || isMobile ? (
        <div className={`submenu-items ${isMobile ? "" : "glass"}`}>{children}</div>
      ) : null}
    </div>
  )
}

export default SubMenu
