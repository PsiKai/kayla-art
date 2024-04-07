import { useLayoutEffect } from "react"
import { AppProvider } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import "../styles/Admin.css"
import Upload from "../components/Upload"

function Admin() {
  const navigate = useNavigate()
  const [cookies] = useCookies(["connect.sid"])

  useLayoutEffect(() => {
    if (!cookies["connect.sid"]) {
      navigate("/login")
    }
  }, [cookies, navigate])

  return (
    <AppProvider>
      <h1>Admin</h1>
      <Upload />
    </AppProvider>
  )
}

export default Admin
