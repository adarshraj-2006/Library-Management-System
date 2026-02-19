import React, { useState } from "react";
import "./Mybooks.css";
import { Calendar, MapPin, Clock, RefreshCw, ArrowLeft, BookOpen, Info, ShieldCheck, AlertCircle } from "lucide-react";

function Mybooks() {
  const [selectedBook, setSelectedBook] = useState(null);

  const books = [
    {
      id: 1,
      title: "The Count of Monte Cristo",
      author: "Robin Buss",
      status: "Overdue",
      dueText: "Overdue by 2 days",
      dueDate: "2024-05-15",
      borrowedDate: "2024-05-01",
      locker: "B-12",
      progress: 100,
      image: "/assets/books/book1.jpg",
      fine: "₹40.00",
      renewals: "0/2",
      category: "Classic Literature",
      isbn: "978-0140449266"
    },
    {
      id: 2,
      title: "Batman: Dark Victory",
      author: "Tim Sale",
      status: "On Time",
      dueText: "Due in 12 days",
      dueDate: "2024-06-01",
      borrowedDate: "2024-05-18",
      locker: "A-04",
      progress: 35,
      image: "/assets/books/book21.jpg",
      fine: "₹0.00",
      renewals: "1/2",
      category: "Graphic Novel",
      isbn: "978-1401244019"
    },
    {
      id: 3,
      title: "Manipal Manual of Surgery",
      author: "K. R. Shenoy",
      status: "Due Soon",
      dueText: "Due in 4 days",
      dueDate: "2024-05-23",
      borrowedDate: "2024-05-09",
      locker: "C-22",
      progress: 80,
      image: "/assets/books/book18.jpg",
      fine: "₹0.00",
      renewals: "0/2",
      category: "Medical Science",
      isbn: "978-9352709083"
    },
    {
      id: 4,
      title: "Vagabond, Vol. 1",
      author: "Takehiko Inoue",
      status: "On Time",
      dueText: "Due in 18 days",
      dueDate: "2024-06-07",
      borrowedDate: "2024-05-24",
      locker: "D-05",
      progress: 15,
      image: "/assets/books/book2.jpg",
      fine: "₹0.00",
      renewals: "2/2",
      category: "Manga",
      isbn: "978-1421520544"
    }
  ];

  const closeModal = () => setSelectedBook(null);

  return (
    <div className="mybooks">
      <div className="header">
        <h1>My Bookshelf</h1>
        <p>Manage your active loans, track renewals, and view reading history.</p>
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
          <h2>02</h2>
        </div>
      </div>

      {/* Books Grid */}
      <div className="books-grid">
        {books.map((book) => (
          <div className="mybook-card" key={book.id} onClick={() => setSelectedBook(book)}>
            <div className="book-image">
              <img src={book.image} alt={book.title} />
              <span className={`badge ${book.status.replace(" ", "").toLowerCase()}`}>
                {book.status}
              </span>
            </div>

            <div className="card-content">
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>

              <div className="book-info">
                <div className="info-row">
                  <Calendar size={14} />
                  <span>{book.dueText}</span>
                </div>
                <div className="info-row">
                  <MapPin size={14} />
                  <span>Locker: {book.locker}</span>
                </div>
              </div>

              <div className="progress-container">
                <div className="progress-header">
                  <span>Reading Progress</span>
                  <span>{book.progress}%</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${book.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loan Details Modal */}
      {selectedBook && (
        <div className="loan-overlay" onClick={closeModal}>
          <div className="loan-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>

            <div className="loan-content">
              <div className="loan-left">
                <img src={selectedBook.image} alt={selectedBook.title} />
                <div className={`loan-status-tag ${selectedBook.status.replace(" ", "").toLowerCase()}`}>
                  {selectedBook.status}
                </div>
              </div>

              <div className="loan-right">
                <div className="loan-header">
                  <h2>{selectedBook.title}</h2>
                  <p className="modal-author">by {selectedBook.author}</p>
                </div>

                <div className="loan-info-grid">
                  <div className="loan-info-item">
                    <Calendar className="icon" size={18} />
                    <div>
                      <p className="label">Borrowed On</p>
                      <p className="value">{selectedBook.borrowedDate}</p>
                    </div>
                  </div>
                  <div className="loan-info-item">
                    <Clock className="icon" size={18} />
                    <div>
                      <p className="label">Due Date</p>
                      <p className="value">{selectedBook.dueDate}</p>
                    </div>
                  </div>
                  <div className="loan-info-item">
                    <MapPin className="icon" size={18} />
                    <div>
                      <p className="label">Pickup Locker</p>
                      <p className="value">{selectedBook.locker}</p>
                    </div>
                  </div>
                  <div className="loan-info-item">
                    <RefreshCw className="icon" size={18} />
                    <div>
                      <p className="label">Renewals Used</p>
                      <p className="value">{selectedBook.renewals}</p>
                    </div>
                  </div>
                  <div className="loan-info-item">
                    <AlertCircle className="icon" size={18} />
                    <div>
                      <p className="label">Accrued Fine</p>
                      <p className="value fine">{selectedBook.fine}</p>
                    </div>
                  </div>
                  <div className="loan-info-item">
                    <Info className="icon" size={18} />
                    <div>
                      <p className="label">ISBN</p>
                      <p className="value">{selectedBook.isbn}</p>
                    </div>
                  </div>
                </div>

                <div className="loan-reading-section">
                  <div className="reading-header">
                    <h3>Reading Progress</h3>
                    <span>{selectedBook.progress}% Complete</span>
                  </div>
                  <div className="large-progress">
                    <div className="large-progress-bar" style={{ width: `${selectedBook.progress}%` }}></div>
                  </div>
                </div>

                <div className="loan-actions">
                  <button className="action-btn renew">Renew Borrowing</button>
                  <button className="action-btn return">Return Book</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Mybooks;
