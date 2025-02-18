import { useLayoutEffect, useState } from "react"
import { AppProvider } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import Upload from "../components/Upload"
import NavbarPlaceholder from "../components/layout/NavbarPlaceholder"
import { ApiProvider } from "../context/ApiContext"

import "../styles/Admin.css"
import Loading from "../components/layout/Loading"

function Admin() {
  const navigate = useNavigate()
  const [cookies, _setCookies, removeCookie] = useCookies(["connect.sid"])
  const [authenticating, setAuthenticating] = useState(true)

  useLayoutEffect(() => {
    if (!cookies["connect.sid"]) return navigate("/login")
    if (!authenticating) return

    fetch("/api/users/login")
      .then(res => {
        if (!res.ok) {
          removeCookie("connect.sid")
          navigate("/login")
        }
      })
      .finally(() => setAuthenticating(false))
  }, [cookies, navigate, authenticating, removeCookie])

  return (
    <AppProvider>
      <ApiProvider>
        <NavbarPlaceholder />
        <h1>Admin</h1>
        {authenticating ? <Loading /> : <Upload />}
      </ApiProvider>
    </AppProvider>
  )
}

export default Admin
