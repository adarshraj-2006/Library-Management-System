
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import './App.css'
import Mybooks from "./pages/Mybooks/Mybooks"
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/Home" element={<Home />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/mybooks" element={<Mybooks />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
        </Routes>




      </BrowserRouter>

    </>
  )
}

export default App
