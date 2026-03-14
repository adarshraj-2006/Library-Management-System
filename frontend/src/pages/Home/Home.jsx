import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Book, FileText, FlaskConical, PenTool, LayoutGrid, Sparkles, Clock, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import BookCard from "../../components/Bookcard/Bookcard";
import API from "../../services/api";
import "./Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const slides = [
    "/assets/for%20home/h1.jpg",
    "/assets/for%20home/h2.jpg",
    "/assets/for%20home/h3.jpg",
    "/assets/for%20home/h4.jpg",
    "/assets/for%20home/h5.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/api/books");
        if (res.data?.data?.books) {
          setBooks(res.data.data.books);
        }
      } catch (err) {
        console.error("Failed to fetch books for Home:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const topics = [
    { title: "Education", icon: <Book size={32} strokeWidth={1} />, color: "#ff6b6b" },
    { title: "Documents", icon: <FileText size={32} strokeWidth={1} />, color: "#4ecdc4" },
    { title: "Science", icon: <FlaskConical size={32} strokeWidth={1} />, color: "#45b7d1" },
    { title: "Literature", icon: <PenTool size={32} strokeWidth={1} />, color: "#f9ca24" },
    { title: "More", icon: <LayoutGrid size={32} strokeWidth={1} />, color: "#576574" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-slider-bg">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url("${slide}")` }}
            />
          ))}
        </div>

        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">"The library of the future is yours to explore."</h1>
          <p className="hero-subtitle">Search through our curated collection of over 50,000 digital volumes.</p>

          <div className="hero-search-wrapper">
            <form className="hero-search-bar" onSubmit={handleSearch}>
              <div className="search-input-group">
                <Search size={22} className="search-icon-left" />
                <input
                  type="text"
                  placeholder="Enter keyword to search collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section animate-fade-in">
        <h2 className="topics-title">Select the topic you are interested in</h2>
        <div className="topics-grid">
          {topics.map((topic, index) => (
            <div className="topic-card" key={index} onClick={() => navigate('/Catalog')}>
              <div className="topic-icon-wrapper">
                <div className="topic-icon" style={{ color: topic.color }}>
                  {topic.icon}
                </div>
                <span className="topic-label">{topic.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split Promo Section */}
      <div className="home-promo-section animate-fade-in">
        <div className="promo-split-container">
          <div className="promo-content-left">
            <span className="promo-tag">New Arrivals</span>
            <h2>Discover the Classics</h2>
            <p>Limited edition digital collectibles now available in our premium archival section. Explore history's most renowned authors.</p>
            <button className="promo-cta" onClick={() => navigate('/Catalog')}>Explore Collection</button>
          </div>
          <div className="promo-image-right">
            <img src="/assets/heropage/3.png" alt="Library Promotion" className="promo-split-img" />
          </div>
        </div>
      </div>

      {/* Book Collections Section */}
      <div className="collections-container animate-fade-in">
        {/* Section 1: Your Reading List */}
        <section className="collection-section">
          <div className="section-header-modern">
            <div className="header-text">
              <h3>Your Reading List</h3>
              <p>Continue where you left off</p>
            </div>
            <Link to="/mybooks" className="view-all-link">
              View All <ChevronRight size={18} />
            </Link>
          </div>
          <div className="reading-list-grid">
            {[
              { title: "The Midnight Library", author: "Matt Haig", category: "FICTION", progress: 65, cover: "/assets/books/book1.jpg" },
              { title: "Atomic Habits", author: "James Clear", category: "SELF-HELP", progress: 20, cover: "/assets/books/book2.jpg" },
              { title: "Dune", author: "Frank Herbert", category: "SCI-FI", progress: 80, cover: "/assets/books/book3.jpg" },
              { title: "Pride & Prejudice", author: "Jane Austen", category: "CLASSIC", progress: 45, cover: "/assets/books/book4.jpg" },
              { title: "1984", author: "George Orwell", category: "CLASSIC", progress: 90, cover: "/assets/books/book5.jpg" },
            ].map((book, i) => (
              <div key={i} className="reading-card">
                <div className="reading-cover">
                  <img src={book.cover} alt={book.title} />
                </div>
                <div className="reading-info">
                  <span className="reading-category">{book.category}</span>
                  <h4 className="reading-title">{book.title}</h4>
                  <p className="reading-author">{book.author}</p>
                  <div className="reading-progress-container">
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${book.progress}%` }}></div>
                    </div>
                    <span className="progress-percent">{book.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Featured Classics */}
        <section className="collection-section">
          <div className="section-header-modern">
            <div className="header-text">
              <h3>Featured Classics</h3>
              <p>Timeless stories that shaped literature</p>
            </div>
            <div className="header-nav-btns">
              <button className="nav-btn-round"><ChevronLeft size={20} /></button>
              <button className="nav-btn-round"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="classics-list">
            {[
              { title: "Moby Dick", author: "Herman Melville", year: "1851", badge: "MUST READ", color: "#f3f4f6", cover: "/assets/books/book6.jpg" },
              { title: "Great Expectations", author: "Charles Dickens", year: "1861", badge: "POPULAR", color: "#ecfdf5", cover: "/assets/books/book7.jpg" },
              { title: "1984", author: "George Orwell", year: "1949", badge: "ESSENTIAL", color: "#fef2f2", cover: "/assets/books/book8.jpg" },
            ].map((book, i) => (
              <div key={i} className="classic-horizontal-card">
                <div className="classic-cover-box" style={{ backgroundColor: book.color }}>
                  <img src={book.cover} alt={book.title} />
                </div>
                <div className="classic-info">
                  <h4 className="classic-title">{book.title}</h4>
                  <p className="classic-author">{book.author}</p>
                  <div className="classic-badges">
                    <span className="badge-year">{book.year}</span>
                    <span className="badge-status">{book.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
