import React from "react";
import "./Mybooks.css";

function Mybooks() {
  const books = [
    {
      id: 1,
      title: "The Count of Monte Cristo",
      author: "Robin Buss",
      status: "Overdue",
      dueText: "Overdue by 2 days",
      locker: "B-12",
      progress: 100,
      image: "/assets/books/book1.jpg",
    },
    {
      id: 2,
      title: "Batman: Dark Victory",
      author: "Tim Sale",
      status: "On Time",
      dueText: "Due in 12 days",
      locker: "A-04",
      progress: 35,
      image: "/assets/books/book21.jpg",
    },
    {
      id: 3,
      title:"Manipal Manual of Surgery",
      author: "K. R. Shenoy",
      status: "Due Soon",
      dueText: "Due in 4 days",
      locker: "C-22",
      progress: 80,
      image: "/assets/books/book18.jpg",
    },
  ];

  return (
    <div className="mybooks">
      <div className="header">
        <h1>My Bookshelf</h1>
        <p>Manage your active loans and reading history.</p>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="card">
          <h4>Currently Borrowed</h4>
          <h2>04 / 06</h2>
        </div>
        <div className="card">
          <h4>Pending Reservations</h4>
          <h2>02</h2>
        </div>
        <div className="card highlight">
          <h4>Books Due Soon</h4>
          <h2>01</h2>
        </div>
      </div>

      {/* Books Grid */}
      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-image">
              <img src={book.image} alt={book.title} />
              <span className={`badge ${book.status.replace(" ", "").toLowerCase()}`}>
                {book.status}
              </span>
            </div>

            <h3>{book.title}</h3>
            <p className="author">{book.author}</p>

            <div className="book-info">
              <span>{book.dueText}</span>
              <span>Locker: {book.locker}</span>
            </div>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${book.progress}%` }}
              ></div>
            </div>

            <div className="actions">
              <button className="primary">Renew</button>
              <button className="secondary">Return</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Mybooks;

