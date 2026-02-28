import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Book, FileText, FlaskConical, PenTool, LayoutGrid } from "lucide-react";
import "./Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
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

        <div className="hero-search-wrapper">
          <div className="animate-fade-in">
            <form className="hero-search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Enter keyword to search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <Search size={24} />
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
    </div>
  );
}

export default Home;
