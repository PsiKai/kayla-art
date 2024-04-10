import "./App.css"

import Navbar from "./components/layout/Navbar.tsx"
import Main from "./pages/Main.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CookiesProvider } from "react-cookie"
// import Subcategory from "./pages/Subcategory.tsx"
// import Collection from "./pages/Collection.tsx"
// import ArtPiece from "./pages/ArtPiece.tsx"
// import Category from "./pages/Category.tsx"
import Admin from "./pages/Admin.tsx"
import Login from "./pages/Login.tsx"
import Illustration from "./pages/Illustration.tsx"
import Family from "./pages/Family.tsx"
import Portraits from "./pages/Portraits.tsx"
import Creative from "./pages/Creative.tsx"
import Pets from "./pages/Pets.tsx"
import Gallery from "./pages/Gallery.tsx"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <CookiesProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="illustration" element={<Illustration />} />
            <Route path="photography/family" element={<Family />} />
            <Route path="photography/portraits" element={<Portraits />} />
            <Route path="photography/creative" element={<Creative />} />
            <Route path="photography/pets" element={<Pets />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="admin" element={<Admin />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </CookiesProvider>
      </main>
    </BrowserRouter>
  )
}

export default App
// <Route path=":category" element={<Category />} />
// <Route path=":category/:subCategory" element={<Subcategory />} />
// <Route path=":category/:subCategory/:artCollection" element={<Collection />} />
// <Route path=":category/:subCategory/:artCollection/:artwork" element={<ArtPiece />} />
