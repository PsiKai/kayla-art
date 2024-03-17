import "./App.css"

import Navbar from "./components/layout/Navbar.tsx"
import Photography from "./pages/Photography.tsx"
import Illustration from "./pages/Illustration.tsx"
import Main from "./pages/Main.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="photography" element={<Photography />} />
        <Route path="illustration" element={<Illustration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
