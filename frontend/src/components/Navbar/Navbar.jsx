import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, BookOpen, Bookmark, User, Moon, LogIn, UserPlus } from "lucide-react";
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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const isHome = location.pathname === '/' || location.pathname === '/Home';
  const isTransparent = isHome;
  const iconColor = (isTransparent && !scrolled) ? "white" : "#1a1a1a";

  return (
    <nav className={`navbar ${isTransparent && !scrolled ? 'transparent' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/Home" className="logo">
          <span>Lumina</span>
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links desktop-nav">
          <Link to='/Home' className={location.pathname === '/Home' ? 'active' : ''}>Home</Link>
          <Link to='/About' className={location.pathname === '/About' ? 'active' : ''}>Information</Link>
          <Link to='/Contact' className={location.pathname === '/Contact' ? 'active' : ''}>Help</Link>
          <Link to='/Catalog' className={location.pathname === '/Catalog' ? 'active' : ''}>Books</Link>
        </div>

        <div className="nav-actions">
          <button className="theme-toggle-btn desktop-only">
            <Moon size={20} color={iconColor} />
          </button>
          {user && (
            <Link to='/dashboard' className="user-nav-profile desktop-only">
              <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="user" />
            </Link>
          )}
          {!user && (
            <Link to='/Login' className="desktop-only nav-signin-btn">Sign In</Link>
          )}
          {/* Hamburger — visible on tablet/mobile (> 768px uses this, < 768px uses bottom nav) */}
          <button className="menu-toggle tablet-only" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} color={iconColor} /> : <Menu size={28} color={iconColor} />}
          </button>
        </div>
      </div>

      {/* === Mobile Drawer === */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <span className="drawer-title">Lumina</span>
          <button className="drawer-close" onClick={closeMenu} aria-label="Close menu">
            <X size={24} color="#1a1a1a" />
          </button>
        </div>

        {/* Auth buttons */}
        <div className="drawer-auth">
          <Link to='/Login' className="drawer-login-btn" onClick={closeMenu}>
            <LogIn size={16} />
            Log In
          </Link>
          <Link to='/Login' className="drawer-signup-btn" onClick={closeMenu}>
            <UserPlus size={16} />
            Sign Up
          </Link>
        </div>

        {/* Browse section */}
        <div className="drawer-section">
          <p className="drawer-section-title">Browse</p>
          <Link to='/Home' className={`drawer-link ${location.pathname === '/Home' ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
          <Link to='/Catalog' className={`drawer-link ${location.pathname === '/Catalog' ? 'active' : ''}`} onClick={closeMenu}>Books</Link>
          <Link to='/About' className={`drawer-link ${location.pathname === '/About' ? 'active' : ''}`} onClick={closeMenu}>Information</Link>
          <Link to='/mybooks' className={`drawer-link ${location.pathname === '/mybooks' ? 'active' : ''}`} onClick={closeMenu}>My Books</Link>
        </div>

        {/* Account section */}
        <div className="drawer-section">
          <p className="drawer-section-title">Account</p>
          <Link to='/Contact' className={`drawer-link ${location.pathname === '/Contact' ? 'active' : ''}`} onClick={closeMenu}>Help & Support</Link>
          {user && (
            <Link to='/dashboard' className={`drawer-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={closeMenu}>Dashboard</Link>
          )}
        </div>
      </div>

      {/* Overlay behind drawer */}
      {isOpen && <div className="drawer-overlay" onClick={closeMenu} />}

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
          <span>My Books</span>
        </div>
        <div className={`md-nav-item ${location.pathname === '/dashboard' || location.pathname === '/Login' ? 'active' : ''}`} onClick={() => navigate(user ? '/dashboard' : '/Login')}>
          <User size={24} />
          <span>Profile</span>
        </div>
      </div>

    </nav>
  );
}
