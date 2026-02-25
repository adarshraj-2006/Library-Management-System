import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
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
import Dashboard from "./pages/Dashboard/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Footer from "./components/Footer/Footer";
import { Toaster } from 'react-hot-toast';

function Layout({ children }) {
  const location = useLocation();
  const hideNavAndFooter = ["/Login", "/dashboard"].includes(location.pathname);

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      {children}
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Layout>
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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
