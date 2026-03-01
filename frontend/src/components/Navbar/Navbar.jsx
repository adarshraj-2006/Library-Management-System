import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, User, Moon, LogIn, UserPlus, LayoutDashboard } from "lucide-react";
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  const navPages = [
    { path: '/Home', label: 'Home' },
    { path: '/Catalog', label: 'Books' },
    { path: '/mybooks', label: 'My Books' },
    { path: '/About', label: 'Information' },
    { path: '/Contact', label: 'Help' },
  ];

  return (
    <>
      {/* ===================== DESKTOP / TABLET NAVBAR ===================== */}
      <nav className={`navbar ${isTransparent && !scrolled ? 'transparent' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link to="/Home" className="logo">
            <span>Lumina</span>
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links desktop-nav">
            {navPages.map(({ path, label }) => (
              <Link key={path} to={path} className={location.pathname === path ? 'active' : ''}>{label}</Link>
            ))}
          </div>

          <div className="nav-actions">
            <button className="theme-toggle-btn desktop-only">
              <Moon size={20} color={iconColor} />
            </button>
            {user ? (
              <Link to='/dashboard' className="user-nav-profile desktop-only">
                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="user" />
              </Link>
            ) : (
              <Link to='/Login' className="desktop-only nav-signin-btn">Sign In</Link>
            )}
            {/* Hamburger — tablet range only (769–900px) */}
            <button className="menu-toggle tablet-only" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={28} color={iconColor} /> : <Menu size={28} color={iconColor} />}
            </button>
          </div>
        </div>
      </nav>

      {/* === Tablet Slide-In Drawer === */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-title">Lumina</span>
          <button className="drawer-close" onClick={closeMenu} aria-label="Close menu">
            <X size={24} color="#1a1a1a" />
          </button>
        </div>
        <div className="drawer-auth">
          <Link to='/Login' className="drawer-login-btn" onClick={closeMenu}>
            <LogIn size={16} /> Log In
          </Link>
          <Link to='/Login' className="drawer-signup-btn" onClick={closeMenu}>
            <UserPlus size={16} /> Sign Up
          </Link>
        </div>
        <div className="drawer-section">
          <p className="drawer-section-title">Browse</p>
          {navPages.map(({ path, label }) => (
            <Link key={path} to={path} className={`drawer-link ${location.pathname === path ? 'active' : ''}`} onClick={closeMenu}>{label}</Link>
          ))}
        </div>
        <div className="drawer-section">
          <p className="drawer-section-title">Account</p>
          {user && (
            <Link to='/dashboard' className={`drawer-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={closeMenu}>Dashboard</Link>
          )}
          <Link to='/Contact' className={`drawer-link ${location.pathname === '/Contact' ? 'active' : ''}`} onClick={closeMenu}>Help &amp; Support</Link>
        </div>
      </div>
      {isOpen && <div className="drawer-overlay" onClick={closeMenu} />}

      {/* ===================== MOBILE TWO-ROW NAVBAR (≤768px) ===================== */}
      <div className="mobile-navbar">
        {/* Row 1: Brand + Profile */}
        <div className="mobile-navbar-row1">
          <Link to="/Home" className="mobile-logo">Lumina</Link>
          <div className="mobile-navbar-icons">
            {user ? (
              <Link to='/dashboard' className="mobile-avatar-link">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                  alt="user"
                  className="mobile-avatar"
                />
              </Link>
            ) : (
              <Link to='/Login' className="mobile-icon-btn" aria-label="Sign in">
                <User size={22} color="#1a1a1a" />
              </Link>
            )}
            <Link to='/dashboard' className="mobile-icon-btn" aria-label="Dashboard">
              <LayoutDashboard size={22} color="#1a1a1a" />
            </Link>
          </div>
        </div>

        {/* Row 2: Horizontal scrollable page links */}
        <div className="mobile-navbar-row2">
          {navPages.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`mobile-nav-tab ${location.pathname === path ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
