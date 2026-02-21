import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Book, Calendar, ArrowRight, Home } from 'lucide-react';
import './Borrowsuccessfully.css';

const Borrowsuccessfully = () => {
  const navigate = useNavigate();

  return (
    <div className="success-overlay">
      <div className="success-glass-card animate-zoom-in">
        <div className="success-icon-wrapper">
          <div className="success-pulse"></div>
          <CheckCircle size={64} className="success-check-icon" />
        </div>

        <div className="success-text-content">
          <h2 className="success-title">Borrowing Successful!</h2>
          <p className="success-description">
            Your request has been processed. The book is now reserved for you.
            Please collect it from your designated locker within 24 hours.
          </p>
        </div>

        <div className="success-details-mini">
          <div className="detail-item">
            <Calendar size={16} />
            <span>Due Date: {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          </div>
          <div className="detail-item">
            <Book size={16} />
            <span>Locker: B-12</span>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/mybooks" className="success-btn primary">
            <Book size={18} />
            View My Bookshelf
          </Link>
          <Link to="/Home" className="success-btn secondary">
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        <button
          className="success-close-btn"
          onClick={() => navigate('/Catalog')}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Decorative background blobs */}
      <div className="blob blob-success-1"></div>
      <div className="blob blob-success-2"></div>
    </div>
  );
}

export default Borrowsuccessfully;
