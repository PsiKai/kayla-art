import "./App.css"

import Navbar from "./components/layout/Navbar.tsx"
import Photography from "./pages/Photography.tsx"
import Illustration from "./pages/Illustration.tsx"
import Main from "./pages/Main.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Subcategory from "./pages/Subcategory.tsx"
import Collection from "./pages/Collection.tsx"
import Upload from "./pages/Upload.tsx"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="photography" element={<Photography />} />
        <Route path="illustration" element={<Illustration />} />
        <Route path=":category/:subcategory" element={<Subcategory />} />
        <Route path=":category/:subcategory/:collection" element={<Collection />} />
        <Route path="upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
