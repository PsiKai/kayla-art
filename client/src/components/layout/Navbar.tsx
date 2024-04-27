import { Link } from "react-router-dom"
import "../../styles/Navbar.css"
import smallLogo from "../../assets/images/logos/kklogosmall.png"

function Navbar() {
  return (
    <header className="page-header">
      <nav className="main-nav">
        <Link className="main-nav-link" to="/">
          <img className="main-nav-logo" src={smallLogo} alt="Kayla Kossajda" />
        </Link>
        <nav className="nav-links">
          <Link to="portraits">Portraits</Link>
          <Link to="pets">Pets</Link>
          <Link to="creative">Creative</Link>
          <Link to="pricing">Pricing</Link>
          <Link to="about">About</Link>
          <Link to="contact">Contact</Link>
          <Link to="gallery">Gallery</Link>
          <Link to="admin">Admin</Link>
        </nav>
      </nav>
    </header>
  )
}

export default Navbar
