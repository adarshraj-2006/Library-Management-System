import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import './App.css'
import Mybooks from "./pages/Mybooks/Mybooks"
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import Borrowpage from "./pages/Borrowpage/Borrowpage";
import Login from "./pages/Login/Login";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Catalog" element={<Catalog />} />
            <Route path="/mybooks" element={<Mybooks />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="/borrow" element={<Borrowpage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  )
}

export default App
