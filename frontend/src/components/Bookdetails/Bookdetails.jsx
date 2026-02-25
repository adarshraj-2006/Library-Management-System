import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Globe, ShieldCheck, Bookmark, Hash } from 'lucide-react';
import './Bookdetails.css';

const BookDetails = ({ book, onBack }) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!book) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === 'book-details-overlay') {
            onBack();
        }
    };

    const {
        coverImage,
        title,
        author,
        genre,
        description,
        availableCopies,
        totalCopies,
        isbn,
        publisher,
        publishedYear
    } = book;

    const isAvailable = availableCopies > 0;
    const displayDescription = description || "No description available for this title.";

    return (
        <div className="book-details-overlay" onClick={handleOverlayClick}>
            <div className="book-details-container animate-fade-in">
                <button className="back-btn" onClick={onBack}>
                    <ArrowLeft size={20} />
                    <span>Back to Catalog</span>
                </button>

                <div className="book-details-content">
                    <div className="book-details-left">
                        <div className="details-image-wrapper">
                            <img
                                src={coverImage || 'https://via.placeholder.com/300x450?text=No+Cover'}
                                alt={title}
                                className="details-img"
                            />
                            <div className={`details-status-badge ${isAvailable ? 'available' : 'unavailable'}`}>
                                {isAvailable ? 'Available' : 'Currently Issued'}
                            </div>
                        </div>

                        <div className="details-quick-stats">
                            <div className="quick-stat">
                                <Hash size={16} />
                                <span>ISBN: {isbn || 'N/A'}</span>
                            </div>
                            <div className="quick-stat">
                                <Clock size={16} />
                                <span>Added: {new Date(book.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="book-details-right">
                        <div className="details-header">
                            <span className="details-genre-tag">{genre}</span>
                            <h1 className="details-title">{title}</h1>
                            <p className="details-author">By <span>{author}</span></p>
                        </div>

                        <div className="details-availability-row">
                            <div className="availability-card">
                                <span className="avail-label">In Library</span>
                                <span className="avail-value">{availableCopies} / {totalCopies}</span>
                            </div>
                            <div className="availability-card">
                                <span className="avail-label">Year</span>
                                <span className="avail-value">{publishedYear || 'N/A'}</span>
                            </div>
                            <div className="availability-card">
                                <span className="avail-label">Publisher</span>
                                <span className="avail-value">{publisher || 'Lumina Press'}</span>
                            </div>
                        </div>

                        <div className="details-description">
                            <h3>Synopsis</h3>
                            <p>{displayDescription}</p>
                        </div>

                        <div className="details-meta-grid">
                            <div className="meta-item">
                                <Globe size={18} />
                                <span>English Edition</span>
                            </div>
                            <div className="meta-item">
                                <ShieldCheck size={18} />
                                <span>Verified Authentic</span>
                            </div>
                        </div>

                        <div className="details-actions">
                            <button
                                className="borrow-now-btn"
                                disabled={!isAvailable}
                                onClick={() => navigate('/borrow', { state: { book } })}
                            >
                                <BookOpen size={20} />
                                <span>{isAvailable ? 'Confirm Borrow' : 'All Copies Issued'}</span>
                            </button>
                            <button className="save-later-btn">
                                <Bookmark size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
