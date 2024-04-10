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
          <Link to="illustration">Illustration</Link>
          <Link to="photography/portraits">Portraits</Link>
          <Link to="photography/family">Family</Link>
          <Link to="photography/creative">Creative</Link>
          <Link to="photography/pets">Pets</Link>
          <Link to="gallery">Gallery</Link>
          <Link to="admin">Admin</Link>
        </nav>
      </nav>
    </header>
  )
}

export default Navbar
