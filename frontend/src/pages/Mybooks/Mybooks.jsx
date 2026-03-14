import React, { useEffect, useState } from 'react';
import './Mybooks.css';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Mybooks = () => {
  const [issues, setIssues] = useState([]);
  const [allIssues, setAllIssues] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBooks();
    fetchRecentlyViewed();
  }, []);

  const fetchMyBooks = async () => {
    try {
      const [issuedRes, allRes] = await Promise.all([
        API.get('/issues/my?status=issued'),
        API.get('/issues/my')
      ]);
      setIssues(issuedRes.data?.data?.issues || issuedRes.data?.issues || []);
      setAllIssues(allRes.data?.data?.issues || allRes.data?.issues || []);
    } catch (err) {
      console.error('Failed to load your books');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentlyViewed = async () => {
    try {
      // Fetch recently returned books or recent books from catalog
      const res = await API.get('/books?limit=6');
      setRecentlyViewed(res.data?.books || res.data?.data?.books || []);
    } catch (err) {
      console.error('Failed to load recently viewed books');
    }
  };

  const calculateDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateStatus = (dueDate, isOverdue) => {
    if (isOverdue) {
      const daysOverdue = Math.abs(calculateDaysUntilDue(dueDate));
      return {
        text: `Overdue by ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''}`,
        className: 'status-overdue',
        icon: 'schedule'
      };
    }

    const daysLeft = calculateDaysUntilDue(dueDate);
    if (daysLeft < 0) {
      return {
        text: `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''}`,
        className: 'status-overdue',
        icon: 'schedule'
      };
    } else if (daysLeft === 0) {
      return {
        text: 'Due today',
        className: 'status-due-today',
        icon: 'schedule'
      };
    } else if (daysLeft === 1) {
      return {
        text: 'Due in 1 day',
        className: 'status-due-soon',
        icon: 'schedule'
      };
    } else if (daysLeft <= 7) {
      return {
        text: `${daysLeft} days left`,
        className: 'status-due-soon',
        icon: 'hourglass_bottom'
      };
    } else {
      return {
        text: `Due ${new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        className: 'status-normal',
        icon: 'calendar_month'
      };
    }
  };

  const handleReturn = async (issueId) => {
    try {
      const loadingToast = toast.loading('Returning book...');
      await API.post('/issues/return', { issueId });
      toast.success('Book returned successfully', { id: loadingToast });
      fetchMyBooks(); // Refresh the list
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to return book');
    }
  };

  const handleRenew = async (issueId) => {
    toast.error('Renewal feature coming soon. Please contact a librarian.');
  };

  const handleBookClick = (bookId) => {
    navigate(`/borrow?id=${bookId}`);
  };

  if (loading) {
    return (
      <div className="mybooks-container">
        <div className="loading-state">Loading your library...</div>
      </div>
    );
  }

  const displayedBooks = showAll ? allIssues : issues.filter(i => i.status === 'issued');
  const issuedBooks = issues.filter(i => i.status === 'issued');

  return (
    <div className="mybooks-container">

      <main className="mybooks-main">
        <div className="mybooks-content">
          <section className="issued-section">
            <div className="section-header">
              <h2>
                Issued
                <span className="badge-count">{displayedBooks.length}</span>
              </h2>
              <button
                className="view-all-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Show Issued' : 'View All'}
              </button>
            </div>

            {displayedBooks.length === 0 ? (
              <div className="empty-state">
                <span className="material-symbols-outlined empty-icon">menu_book</span>
                <h3>No books {showAll ? 'found' : 'issued'}</h3>
                <p>{showAll ? 'You haven\'t borrowed any books yet.' : 'Browse the catalog to borrow your first book!'}</p>
              </div>
            ) : (
              <div className="books-list">
                {displayedBooks.map((issue) => {
                  const isReturned = issue.status === 'returned';
                  const status = isReturned
                    ? { text: 'Returned', className: 'status-returned', icon: 'check_circle' }
                    : getDueDateStatus(issue.dueDate, issue.isCurrentlyOverdue);
                  return (
                    <div key={issue._id} className="book-card">
                      <div
                        className="book-cover"
                        onClick={() => handleBookClick(issue.book._id)}
                      >
                        {issue.book.coverImage ? (
                          <div
                            className="cover-image"
                            style={{ backgroundImage: `url("${issue.book.coverImage}")` }}
                          />
                        ) : (
                          <div className="cover-placeholder">
                            <span className="material-symbols-outlined">menu_book</span>
                          </div>
                        )}
                      </div>
                      <div className="book-info">
                        <div className="book-details">
                          <h3>{issue.book.title}</h3>
                          <p className="author">{issue.book.author}</p>
                          <div className={`status-badge ${status.className}`}>
                            <span className="material-symbols-outlined">{status.icon}</span>
                            <span>{status.text}</span>
                          </div>
                        </div>
                        {!isReturned && (
                          <div className="book-actions">
                            <button
                              className="action-btn secondary"
                              onClick={() => handleReturn(issue._id)}
                            >
                              Return
                            </button>
                            <button
                              className="action-btn primary"
                              onClick={() => handleRenew(issue._id)}
                            >
                              Renew
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="recently-viewed-section">
            <div className="section-header">
              <h2>Recently Viewed</h2>
              <button className="icon-btn-small" aria-label="View more">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="recent-books-scroll">
              {recentlyViewed.map((book) => (
                <div
                  key={book._id}
                  className="recent-book-card"
                  onClick={() => handleBookClick(book._id)}
                >
                  <div className="recent-book-cover">
                    {book.coverImage ? (
                      <div
                        className="recent-cover-image"
                        style={{ backgroundImage: `url("${book.coverImage}")` }}
                      />
                    ) : (
                      <div className="recent-cover-placeholder">
                        <span className="material-symbols-outlined">menu_book</span>
                      </div>
                    )}
                  </div>
                  <div className="recent-book-info">
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <nav className="bottom-nav mobile-only">
        <Link to="/Home" className="nav-item">
          <span className="material-symbols-outlined">home</span>
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/mybooks" className="nav-item active">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="nav-label">My Books</span>
        </Link>
        <Link to="/Catalog" className="nav-item">
          <span className="material-symbols-outlined">search</span>
          <span className="nav-label">Browse</span>
        </Link>
        <Link to="/dashboard" className="nav-item">
          <span className="material-symbols-outlined">settings</span>
          <span className="nav-label">Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Mybooks;
