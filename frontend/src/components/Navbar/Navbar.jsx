import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookMarked, Home, BookOpen, Bookmark, User } from "lucide-react";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
          <Link to='/About' className={location.pathname === '/About' ? 'active' : ''}>About</Link>
          <Link to='/Contact' className={location.pathname === '/Contact' ? 'active' : ''}>Contact</Link>
          <Link to='/Login' className="signin mobile-only">{user ? 'Profile' : 'Sign in'}</Link>
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

      {/* Global Bottom Navigation for Mobile */}
      <div className="mobile-bottom-nav">
        <div className={`md-nav-item ${location.pathname === '/Home' ? 'active' : ''}`} onClick={() => navigate('/Home')}>
          <Home size={24} />
          <span>Home</span>
        </div>
        <div className={`md-nav-item ${location.pathname === '/Catalog' ? 'active' : ''}`} onClick={() => navigate('/Catalog')}>
          <BookOpen size={24} />
          <span>Catalog</span>
        </div>
        <div className={`md-nav-item ${location.pathname === '/mybooks' ? 'active' : ''}`} onClick={() => navigate('/mybooks')}>
          <Bookmark size={24} />
          <span>Bookmarks</span>
        </div>
        <div className={`md-nav-item ${location.pathname === '/dashboard' || location.pathname === '/Login' ? 'active' : ''}`} onClick={() => navigate(user ? '/dashboard' : '/Login')}>
          <User size={24} />
          <span>Profile</span>
        </div>
      </div>

    </nav>
  );
}
