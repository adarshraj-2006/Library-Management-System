import "./BookCard.css";
import { BookOpen, Info } from "lucide-react";

function BookCard({ image, title, author, available }) {
  return (
    <div className="book-card">
      <div className="book-status-badge">
        <span className={`status-dot ${available ? "available" : "unavailable"}`}></span>
        {available ? "Available" : "Checked Out"}
      </div>

      <div className="book-image">
        <img src={image} alt={title} />
        <div className="book-overlay">
          <button className="overlay-btn icon-btn"><Info size={18} /></button>
        </div>
      </div>

      <div className="book-info">
        <h3 title={title}>{title}</h3>
        <p className="author">by {author}</p>

        <div className="book-actions">
          <button className={`borrow-btn ${!available ? "disabled" : ""}`} disabled={!available}>
            <BookOpen size={16} />
            <span>{available ? "Borrow" : "Reserved"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
