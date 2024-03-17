import React from "react"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div>
      <h3> Navbar </h3>
      <Link to="/">Home</Link>
      <Link to="illustration">Illustration</Link>
      <Link to="photography">Photography</Link>
    </div>
  )
}

export default Navbar
