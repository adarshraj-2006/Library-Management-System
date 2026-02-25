import "./Bookcard.css";
import { Star } from "lucide-react";

function BookCard({ coverImage, title, author, genre, availableCopies, totalCopies }) {
  const isAvailable = availableCopies > 0;

  return (
    <div className="book-card-container">
      <div className="book-card">
        <div className={`status-badge ${isAvailable ? 'available' : 'unavailable'}`}>
          {isAvailable ? 'Available' : 'Issued'}
        </div>

        <div className="book-image-container">
          <img
            src={coverImage || 'https://via.placeholder.com/150?text=No+Cover'}
            alt={title}
            className="book-image-main"
          />
        </div>
      </div>

      <div className="book-details">
        <span className="book-genre-tag">{genre}</span>
        <h3 className="book-title-main" title={title}>{title}</h3>
        <p className="book-author-main">{author}</p>

        <div className="availability-info">
          <div className="stock-bar">
            <div
              className="stock-progress"
              style={{ width: `${(availableCopies / totalCopies) * 100}%` }}
            ></div>
          </div>
          <span className="stock-text">{availableCopies} / {totalCopies} copies left</span>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
