/* global NodeJS */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useMobileContext } from "../../hooks/useMobileContext"
import "../../styles/SubMenu.css"
import { useLocation } from "react-router-dom"
import { CSSTransition } from "react-transition-group"

type SubMenuProps = {
  children: React.ReactNode
  title: string
}

function SubMenu({ children, title }: SubMenuProps) {
  const [expanded, setExpanded] = useState(false)
  const { isMobile } = useMobileContext()
  const location = useLocation()
  const mouseLeaveTimeout = useRef<NodeJS.Timeout | null>(null)
  const fadeInTimer = useMemo(() => 75, [])

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
      <CSSTransition
        in={expanded || isMobile}
        timeout={fadeInTimer}
        classNames="fade-in"
        unmountOnExit
      >
        <div style={{ "--transition-duration": `${fadeInTimer}ms` } as React.CSSProperties}>
          <div className={`submenu-items ${isMobile ? "" : "glass"}`}>{children}</div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default SubMenu
