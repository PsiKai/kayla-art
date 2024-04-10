import "./App.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CookiesProvider } from "react-cookie"

import Navbar from "./components/layout/Navbar.tsx"
import Main from "./pages/Main.tsx"
import Portraits from "./pages/Portraits.tsx"
import Pets from "./pages/Pets.tsx"
import Creative from "./pages/Creative.tsx"
import About from "./pages/About.tsx"
import Pricing from "./pages/Pricing.tsx"
import Gallery from "./pages/Gallery.tsx"
import Admin from "./pages/Admin.tsx"
import Login from "./pages/Login.tsx"
import Footer from "./components/layout/Footer.tsx"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <CookiesProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="portraits" element={<Portraits />} />
            <Route path="pets" element={<Pets />} />
            <Route path="creative" element={<Creative />} />
            <Route path="about" element={<About />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="admin" element={<Admin />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </CookiesProvider>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App

// import Subcategory from "./pages/Subcategory.tsx"
// import Collection from "./pages/Collection.tsx"
// import ArtPiece from "./pages/ArtPiece.tsx"
// import Category from "./pages/Category.tsx"
// <Route path=":category" element={<Category />} />
// <Route path=":category/:subCategory" element={<Subcategory />} />
// <Route path=":category/:subCategory/:artCollection" element={<Collection />} />
// <Route path=":category/:subCategory/:artCollection/:artwork" element={<ArtPiece />} />
