import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookMarked } from "lucide-react";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [user, setUser] = useState(null);

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
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
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
          {user && <Link to='/dashboard' className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>}
          <Link to='/About' className={location.pathname === '/About' ? 'active' : ''}>About</Link>
          <Link to='/Contact' className={location.pathname === '/Contact' ? 'active' : ''}>Contact</Link>
          {!user ? (
            <Link to='/Login' className="signin mobile-only">Sign in</Link>
          ) : (
            <Link to='/dashboard' className="mobile-only">Profile</Link>
          )}
        </div>

        <div className="nav-actions">
          {!user ? (
            <Link to='/Login' className="signin desktop-only">Sign in</Link>
          ) : (
            <Link to='/dashboard' className="user-nav-profile desktop-only">
              <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="user" />
            </Link>
          )}
          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
}
