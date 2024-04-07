import { useLayoutEffect, useState } from "react"
import { AppProvider } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import "../styles/Admin.css"
import Upload from "../components/Upload"

function Admin() {
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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
      <h1>Admin</h1>
      {authenticating ? <p>Authenticating...</p> : <Upload />}
    </AppProvider>
  )
}

export default Admin
