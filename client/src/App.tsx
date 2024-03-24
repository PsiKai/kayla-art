import "./App.css"

import Navbar from "./components/layout/Navbar.tsx"
import Photography from "./pages/Photography.tsx"
import Illustration from "./pages/Illustration.tsx"
import Main from "./pages/Main.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Subcategory from "./pages/Subcategory.tsx"
import Collection from "./pages/Collection.tsx"
import Upload from "./pages/Upload.tsx"
import ArtPiece from "./pages/ArtPiece.tsx"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="photography" element={<Photography />} />
          <Route path="illustration" element={<Illustration />} />
          <Route path=":category/:subcategory" element={<Subcategory />} />
          <Route path=":category/:subcategory/:collection" element={<Collection />} />
          <Route path=":category/:subcategory/:collection/:artwork" element={<ArtPiece />} />
          <Route path="upload" element={<Upload />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
