import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Book, FileText, FlaskConical, PenTool, LayoutGrid } from "lucide-react";
import "./Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const topics = [
    { title: "Education", icon: <Book size={48} strokeWidth={1} />, color: "#ff6b6b" },
    { title: "Documents", icon: <FileText size={48} strokeWidth={1} />, color: "#4ecdc4" },
    { title: "Science", icon: <FlaskConical size={48} strokeWidth={1} />, color: "#45b7d1" },
    { title: "Literature", icon: <PenTool size={48} strokeWidth={1} />, color: "#f9ca24" },
    { title: "More", icon: <LayoutGrid size={48} strokeWidth={1} />, color: "#576574" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-search-wrapper animate-fade-in">
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

      {/* Topics Section */}
      <div className="topics-section animate-fade-in">
        <h2 className="topics-title">Select the topic you are interested in</h2>
        <div className="topics-grid">
          {topics.map((topic, index) => (
            <div className="topic-card" key={index} onClick={() => navigate('/Catalog')}>
              <div className="topic-icon-wrapper" style={{ color: topic.color }}>
                {topic.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
