import { Link } from "react-router-dom"
import "../../styles/Navbar.css"

function Navbar() {
  return (
    <header className="page-header">
      <span> Navbar </span>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="illustration">Illustration</Link>
        <Link to="photography">Photography</Link>
        <Link to="admin">Admin</Link>
      </nav>
    </header>
  )
}

export default Navbar
