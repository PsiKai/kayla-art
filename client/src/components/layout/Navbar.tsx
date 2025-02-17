import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useMobileContext } from "../../hooks/useMobileContext"
import SubMenu from "./SubMenu"
import "../../styles/Navbar.css"
import smallLogo from "../../assets/images/logos/kklogosmall.png"
import Hamburger from "./Hamburger"

function Navbar() {
  const location = useLocation()
  const { isMobile, navbarRef } = useMobileContext()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setOpen(false)
  }, [location])

  return (
    <header className={`page-header glass ${open ? "is-open" : ""}`} ref={navbarRef}>
      <nav className="main-nav">
        <Link className="main-nav-link" to="/">
          <img className="main-nav-logo" src={smallLogo} alt="Kayla Kossajda" />
        </Link>
        {isMobile ? <Hamburger open={open} onClick={() => setOpen(!open)} /> : null}
        <div className={`nav-links-wrapper ${isMobile ? "glass" : ""}`}>
          <nav className="nav-links">
            <SubMenu title="Photography">
              <Link to="photography/portraits">Portraits</Link>
              <Link to="photography/pets">Pets</Link>
              <Link to="photography/creative">Creative</Link>
            </SubMenu>
            <SubMenu title="Illustration">
              <Link to="illustration/portraits">Portraits</Link>
              <Link to="illustration/creative">Creative</Link>
            </SubMenu>
            <Link to="pricing">Pricing</Link>
            <Link to="about">About</Link>
            <Link to="contact">Contact</Link>
            <Link to="admin">Admin</Link>
          </nav>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
