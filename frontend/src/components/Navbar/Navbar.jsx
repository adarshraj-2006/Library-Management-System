import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookMarked } from "lucide-react";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/Home" className="logo">
          <div className="logo-box">
            <BookMarked size={22} color="white" />
          </div>
          <span>Lumina</span>
        </Link>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to='/Home' className={location.pathname === '/Home' ? 'active' : ''}>Home</Link>
          <Link to='/Catalog' className={location.pathname === '/Catalog' ? 'active' : ''}>Catalog</Link>
          <Link to='/mybooks' className={location.pathname === '/mybooks' ? 'active' : ''}>My books</Link>
          <Link to='/About' className={location.pathname === '/About' ? 'active' : ''}>About</Link>
          <Link to='/Contact' className={location.pathname === '/Contact' ? 'active' : ''}>Contact</Link>
          <Link to='/Login' className="signin mobile-only">Sign in</Link>
        </div>

        <div className="nav-actions">
          <Link to='/Login' className="signin desktop-only">Sign in</Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
}
