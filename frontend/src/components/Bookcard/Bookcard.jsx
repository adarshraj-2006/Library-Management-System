import "./BookCard.css";

function BookCard({ image, title, author, available }) {
  return (
    <div className="book-card">
      <div className="book-image">
        <img src={image} alt={title} />
      </div>

      <div className="book-info">
        <h3>{title}</h3>
        <p className="author">by {author}</p>

        <span className={available ? "status available" : "status unavailable"}>
          {available ? "Available" : "Not Available"}
        </span>

        <button className="borrow-btn">
          {available ? "Borrow Book" : "View Details"}
        </button>
      </div>
    </div>
  );
}

export default BookCard;