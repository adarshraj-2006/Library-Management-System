import React, { useEffect, useState } from 'react';
import './Mybooks.css';
import { Book, Clock, AlertCircle, CheckCircle, Info, Calendar, ChevronRight } from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';

const Mybooks = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await API.get('/issues/my');
        setIssues(res.data.data.issues);
      } catch (err) {
        toast.error('Failed to load your books');
      } finally {
        setLoading(false);
      }
    };
    fetchMyBooks();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'issued': return 'status-issued';
      case 'overdue': return 'status-overdue';
      case 'returned': return 'status-returned';
      default: return '';
    }
  };

  if (loading) return <div className="loading-state">Loading your library...</div>;

  return (
    <div className="mybooks-page">
      <div className="page-header">
        <div>
          <h1>My Reading Journey</h1>
          <p>Track your currently borrowed and past books</p>
        </div>
        <div className="summary-badges">
          <div className="summary-item">
            <span className="count">{issues.filter(i => i.status === 'issued').length}</span>
            <span className="label">Active</span>
          </div>
          <div className="summary-item">
            <span className="count overdue">{issues.filter(i => i.status === 'overdue' || (i.status === 'issued' && i.isCurrentlyOverdue)).length}</span>
            <span className="label">Overdue</span>
          </div>
        </div>
      </div>

      <div className="books-horizontal-list">
        {issues.length === 0 ? (
          <div className="empty-state">
            <Book size={48} />
            <h3>Your shelf is empty</h3>
            <p>Browse the catalog to borrow your first book!</p>
          </div>
        ) : (
          issues.map((issue) => (
            <div key={issue._id} className="horizontal-book-card">
              <div className="book-cover-mini">
                {issue.book.coverImage ? (
                  <img src={issue.book.coverImage} alt={issue.book.title} />
                ) : (
                  <div className="cover-placeholder"><Book size={32} /></div>
                )}
              </div>

              <div className="book-info-main">
                <div className="title-row">
                  <h3>{issue.book.title}</h3>
                  <span className={`status-badge ${getStatusStyle(issue.status)}`}>
                    {issue.status.toUpperCase()}
                  </span>
                </div>
                <p className="author-text">by {issue.book.author}</p>

                <div className="date-details">
                  <div className="detail-item">
                    <Calendar size={14} />
                    <span>Issued: {new Date(issue.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={14} />
                    <span>Due: {new Date(issue.dueDate).toLocaleDateString()}</span>
                  </div>
                  {issue.returnDate && (
                    <div className="detail-item success">
                      <CheckCircle size={14} />
                      <span>Returned: {new Date(issue.returnDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="fine-section">
                {issue.fine > 0 && (
                  <div className="fine-amount">
                    <AlertCircle size={16} />
                    <span>Fine: ₹{issue.fine}</span>
                  </div>
                )}
                <button className="details-btn">
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Mybooks;
