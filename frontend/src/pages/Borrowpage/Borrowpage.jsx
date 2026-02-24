import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Borrowpage.css';
import { ShieldCheck, Calendar, ArrowLeft, Loader2, BookOpen, CheckCircle2 } from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';

const Borrowpage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { book } = location.state || {};

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [issueDetails, setIssueDetails] = useState(null);

    useEffect(() => {
        if (!book) {
            toast.error("Please select a book from the catalog first");
            navigate('/Catalog');
        }

        // Check if user is logged in
        const user = localStorage.getItem('user');
        if (!user) {
            toast.error("Please sign in to borrow books");
            navigate('/Login');
        }
    }, [book, navigate]);

    const handleConfirmBorrow = async () => {
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await API.post('/issues/issue', {
                bookId: book._id,
                memberId: user._id
            });
            setIssueDetails(res.data.data);
            setSuccess(true);
            toast.success('Book borrowed successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to borrow book');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="borrow-container success-mode animate-fade-in">
                <div className="success-card">
                    <div className="success-icon-wrapper">
                        <CheckCircle2 size={60} color="#22c55e" />
                    </div>
                    <h1>Borrow Confirmed!</h1>
                    <p>Happy reading! "{book.title}" is now on your shelf.</p>

                    <div className="issue-summary">
                        <div className="summary-row">
                            <span>Due Date:</span>
                            <strong>{new Date(issueDetails.dueDate).toLocaleDateString()}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Policy:</span>
                            <strong>14 Days Free Loan</strong>
                        </div>
                    </div>

                    <div className="success-actions">
                        <button onClick={() => navigate('/mybooks')} className="primary-btn">
                            Go to My Books
                        </button>
                        <button onClick={() => navigate('/Catalog')} className="secondary-btn">
                            Browse More
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!book) return null;

    return (
        <div className="borrow-container">
            <button className="back-link" onClick={() => navigate(-1)}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="borrow-confirmation-card animate-fade-in">
                <div className="borrow-header">
                    <h1>Review & Confirm</h1>
                    <p>You're about to borrow this masterpiece</p>
                </div>

                <div className="book-mini-preview">
                    <div className="mini-cover">
                        <img src={book.coverImage || book.image} alt={book.title} />
                    </div>
                    <div className="mini-details">
                        <h3>{book.title}</h3>
                        <p>by {book.author}</p>
                        <div className="tag">Ready to Sync</div>
                    </div>
                </div>

                <div className="terms-box">
                    <div className="term-item">
                        <Calendar size={18} />
                        <div>
                            <strong>14 Days Return Policy</strong>
                            <span>Due in exactly 2 weeks from today</span>
                        </div>
                    </div>
                    <div className="term-item">
                        <ShieldCheck size={18} />
                        <div>
                            <strong>Automatic Extension</strong>
                            <span>Request extensions via dashboard</span>
                        </div>
                    </div>
                </div>

                <button
                    className="confirm-borrow-btn"
                    onClick={handleConfirmBorrow}
                    disabled={loading}
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Confirm Borrow'}
                </button>

                <p className="footer-notice">
                    By confirming, you agree to our library lending terms.
                </p>
            </div>
        </div>
    );
};

export default Borrowpage;
