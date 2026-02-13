import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Navbar.css";

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
          
          <a href="#">Home</a>
          <a href="#">Catalog</a>
          <a href="#">My books</a>
          <a href="#">Contact</a>
          <a href="#">Profile</a>
        </div>

        <button className="signin">Sign in</button>
      </div>
    </nav>
  );
}

