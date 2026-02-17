import { Link } from "react-router-dom";
import { Book, Library, Globe, ArrowRight, Bookmark } from "lucide-react";
import "./Home.css";
import HeroDashboard from "../../components/HeroDashboard/HeroDashboard";

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-left animate-fade-in">
          <h1>Welcome to Your <br /><span>Digital Sanctuary</span></h1>
          <p>
            Explore a vast universe of knowledge. Manage your personal collection,
            discover new bestsellers, and immerse yourself in stories that change lives.
          </p>
          <div className="hero-btns">
            <Link to="/Catalog" className="primary-btn">
              Explore Catalog <ArrowRight size={20} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </Link>
            <Link to="/Contact" className="secondary-btn">Contact Us</Link>
          </div>
        </div>

        <div className="hero-right animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="book-animation">
            <div className="floating-books">
              <Bookmark className="book-icon" style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
              <Book className="book-icon" style={{ top: '50%', left: '80%', animationDelay: '2s' }} />
              <Library className="book-icon" style={{ top: '80%', left: '20%', animationDelay: '4s' }} />
            </div>
            <HeroDashboard />
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="icon-box">
            <Bookmark />
          </div>
          <h3>Easy Borrowing</h3>
          <p>Borrow books with just a click and manage your due dates effortlessly with automated reminders.</p>
        </div>
        <div className="feature-card animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="icon-box">
            <Library />
          </div>
          <h3>Wide Collection</h3>
          <p>From timeless classics to modern bestsellers, our curated collection spans every genre imaginable.</p>
        </div>
        <div className="feature-card animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="icon-box">
            <Globe />
          </div>
          <h3>Global Access</h3>
          <p>Access your favorite titles anytime, anywhere. Your library follows you on every digital device.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

