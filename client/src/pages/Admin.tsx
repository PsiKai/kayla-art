import { useLayoutEffect, useState } from "react"
import { AppProvider } from "../context/AppContext"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import Upload from "../components/Upload"
import NavbarPlaceholder from "../components/layout/NavbarPlaceholder"
import { ApiProvider } from "../context/ApiContext"
import Loading from "../components/layout/Loading"
import Biography from "../components/Biography"
import AdminPricing from "../components/AdminPricing"

import "../styles/Admin.css"

function Admin() {
  const navigate = useNavigate()
  const [cookies, _setCookies, removeCookie] = useCookies(["connect.sid"])
  const [authenticating, setAuthenticating] = useState(true)

  useLayoutEffect(() => {
    if (!cookies["connect.sid"]) {
      void navigate("/login")
      return
    }
    if (!authenticating) return

    void fetch("/api/users/login")
      .then(res => {
        if (!res.ok) {
          removeCookie("connect.sid")
          void navigate("/login")
        }
      })
      .finally(() => setAuthenticating(false))
  }, [cookies, navigate, authenticating, removeCookie])

  return (
    <AppProvider>
      <ApiProvider>
        <NavbarPlaceholder />
        <h1>Admin</h1>
        <div style={{ position: "relative" }}>
          {authenticating ? (
            <Loading />
          ) : (
            <>
              <h2>Make Changes To Your Site</h2>
              <nav className="admin-nav">
                <Link to="/admin">Galleries</Link>
                <Link to="/admin/about">About</Link>
                <Link to="/admin/pricing">Pricing</Link>
              </nav>
              <Routes>
                <Route path="/" element={<Upload />} />
                <Route path="/about" element={<Biography />} />
                <Route path="/pricing" element={<AdminPricing />} />
              </Routes>
            </>
          )}
        </div>
      </ApiProvider>
    </AppProvider>
  )
}

export default Admin
