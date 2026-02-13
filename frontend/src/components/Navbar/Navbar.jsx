import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Navbar.css";
import Catalog from "../../pages/Catalog/Catalog";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <div className="logo-box"></div>
          <span>Library</span>
        </div>

        <div className="nav-links">
          
          <Link to='/Home'>Home</Link>
          <Link to='/Catalog'>Catalog</Link>
          <Link to='/mybooks'>My books</Link>
          <Link to='/Contact'>Contact</Link>
          <Link to='/About'>About</Link>
        </div>

        <button className="signin">Sign in</button>
      </div>
    </nav>
  );
}

