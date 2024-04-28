import { useCallback, useRef, useState } from "react"
import { useMobileContext } from "../../hooks/useMobileContext"
import "../../styles/SubMenu.css"

type SubMenuProps = {
  children: React.ReactNode
  title: string
}

function SubMenu({ children, title }: SubMenuProps) {
  const [expanded, setExpanded] = useState(false)
  const isMobile = useMobileContext()
  const mouseLeaveTimeout = useRef<NodeJS.Timeout | null>(null)

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
        className="btn-link"
        {...(isMobile ? {} : { onClick: handleClick })}
        aria-expanded={expanded || isMobile}
      >
        {title}
      </button>
      {expanded || isMobile ? <div className="submenu-items">{children}</div> : null}
    </div>
  )
}

export default SubMenu
