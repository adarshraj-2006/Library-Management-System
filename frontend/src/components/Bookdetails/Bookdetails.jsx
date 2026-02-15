import React, { useEffect } from 'react';
import { Star, ArrowLeft, ShoppingCart, Heart, BookOpen } from 'lucide-react';
import './Bookdetails.css';

const BookDetails = ({ book, onBack }) => {
    useEffect(() => {
        // Prevent scrolling on the body when the modal is open
        document.body.style.overflow = 'hidden';

        // Restore scrolling when the modal is closed
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!book) return null;

    const handleOverlayClick = (e) => {
        // Close if the click is directly on the overlay div, not its children
        if (e.target.className === 'book-details-overlay') {
            onBack();
        }
    };

    const {
        image,
        title,
        author,
        price,
        originalPrice,
        discount,
        rating,
        description,
        available,
        pages,
        language
    } = book;

    // Default description if none provided
    const displayDescription = description || "A gripping tale that explores the depths of human emotion and the complexities of life. This book offers a unique perspective that will leave readers contemplating long after they've turned the final page.";

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={18}
                className={i < rating ? "star-filled" : "star-empty"}
            />
        ));
    };

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
                            <img src={image} alt={title} className="details-img" />
                            {discount && <div className="details-discount">-{discount}%</div>}
                        </div>
                    </div>

                    <div className="book-details-right">
                        <div className="details-header">
                            <h1 className="details-title">{title}</h1>
                            <p className="details-author">by <span>{author}</span></p>
                            <div className="details-rating-row">
                                <div className="details-stars">{renderStars(rating)}</div>
                                <span className="details-reviews">(120+ Reviews)</span>
                            </div>
                        </div>

                        <div className="details-pricing">
                            <span className="details-price">₹{price}</span>
                            {originalPrice && <span className="details-original">₹{originalPrice}</span>}
                            <span className="details-availability">
                                <span className={`status-dot ${available ? 'available' : 'unavailable'}`}></span>
                                {available ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        <div className="details-info-grid">
                            <div className="info-item">
                                <BookOpen size={18} />
                                <div className="info-content">
                                    <span className="info-label">Pages</span>
                                    <span className="info-value">{pages || '320'}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-content">
                                    <span className="info-label">Language</span>
                                    <span className="info-value">{language || 'English'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="details-description">
                            <h3>Description</h3>
                            <p>{displayDescription}</p>
                        </div>

                        <div className="details-actions">
                            <button className="add-to-cart-btn" disabled={!available}>
                                <ShoppingCart size={20} />
                                <span>{available ? 'Borrow Now' : 'Out of Stock'}</span>
                            </button>
                            <button className="wishlist-btn">
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
