import "./BookCard.css";
import { Star } from "lucide-react";

function BookCard({ image, title, author, price, originalPrice, discount, rating }) {
  // Generate stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "star-filled" : "star-empty"}
      />
    ));
  };

  return (
    <div className="book-card-container">
      <div className="book-card">
        {discount && (
          <div className="discount-badge">
            {discount}%
          </div>
        )}

        <div className="book-image-container">
          <img src={image} alt={title} className="book-image-main" />
        </div>
      </div>

      <div className="book-details">
        <h3 className="book-title-main" title={title}>{title}</h3>
        <p className="book-author-main">{author}</p>

        <div className="book-rating">
          {renderStars(rating)}
        </div>

        <div className="book-pricing">
          <span className="current-price">₹{price}</span>
          {originalPrice && (
            <span className="original-price">₹{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
