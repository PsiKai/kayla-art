import "./App.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CookiesProvider } from "react-cookie"
import { MobileProvider } from "./context/MobileContext.tsx"

import Navbar from "./components/layout/Navbar.tsx"
import Main from "./pages/Main.tsx"
import About from "./pages/About.tsx"
import Contact from "./pages/Contact.tsx"
import Pricing from "./pages/Pricing.tsx"
import Admin from "./pages/Admin.tsx"
import Login from "./pages/Login.tsx"
import Footer from "./components/layout/Footer.tsx"
import CreativePhotography from "./pages/CreativePhotography.tsx"
import PetPhotography from "./pages/PetPhotography.tsx"
import PortraitPhotography from "./pages/PortraitPhotography.tsx"
import CreativeIllustration from "./pages/CreativeIllustration.tsx"
import PortraitIllustration from "./pages/PortraitIllustration.tsx"
import PhotographyGallery from "./pages/PhotographyGallery.tsx"

function App() {
  return (
    <MobileProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <CookiesProvider>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="photography/pets" element={<PetPhotography />} />
              <Route path="photography/portraits" element={<PortraitPhotography />} />
              <Route path="photography/creative" element={<CreativePhotography />} />
              <Route path="photography/gallery" element={<PhotographyGallery />} />
              <Route path="illustration/portraits" element={<PortraitIllustration />} />
              <Route path="illustration/creative" element={<CreativeIllustration />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="admin" element={<Admin />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </CookiesProvider>
        </main>
        <Footer />
      </BrowserRouter>
    </MobileProvider>
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
