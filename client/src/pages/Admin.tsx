import "../styles/Admin.css"
import Upload from "../components/Upload"
import { AppProvider } from "../context/AppContext"

function Admin() {
  return (
    <AppProvider>
      <h1>Admin</h1>
      <Upload />
    </AppProvider>
  )
}

export default Admin
