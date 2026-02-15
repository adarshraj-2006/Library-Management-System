import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-left">
          <h1>Welcome to Your <br /><span>Digital Sanctuary</span></h1>
          <p>Explore thousands of books, manage your collection, and dive into new worlds with our state-of-the-art Library Management System.</p>
          <div className="hero-btns">
            <Link to="/Catalog" className="primary-btn">Explore Catalog</Link>
            <Link to="/Contact" className="secondary-btn">Contact Us</Link>
          </div>
        </div>

        <div className="hero-right animate-fade-in">
          <div className="hero-image-container">
            <img src="/assets/main1.png" alt="Library Illustration" className="hero-main-img animate-float" />
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>Easy Borrowing</h3>
          <p>Borrow books with just a click and manage your due dates effortlessly.</p>
        </div>
        <div className="feature-card">
          <h3>Wide Collection</h3>
          <p>From classics to modern bestsellers, find everything you need.</p>
        </div>
        <div className="feature-card">
          <h3>Digital Access</h3>
          <p>Access your favorite titles anytime, anywhere from any device.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
