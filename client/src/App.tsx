import "./App.css"

import Navbar from "./components/layout/Navbar.tsx"
import Main from "./pages/Main.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Subcategory from "./pages/Subcategory.tsx"
import Collection from "./pages/Collection.tsx"
import ArtPiece from "./pages/ArtPiece.tsx"
import Admin from "./pages/Admin.tsx"
import Category from "./pages/Category.tsx"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path=":category" element={<Category />} />
          <Route path=":category/:subCategory" element={<Subcategory />} />
          <Route path=":category/:subCategory/:artCollection" element={<Collection />} />
          <Route path=":category/:subCategory/:artCollection/:artwork" element={<ArtPiece />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
