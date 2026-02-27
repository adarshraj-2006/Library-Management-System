import React from 'react';
import './HeroDashboard.css';
import { Search, Book, Bookmark, TrendingUp, Clock, ArrowRight, Star, BookMarked, Home, User } from 'lucide-react';

const HeroDashboard = () => {
    const bookData = [
        {
            id: 1,
            title: "The Midnight Library",
            author: "Matt Haig",
            cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
            category: "Fiction",
            rating: 4.8
        },
        {
            id: 2,
            title: "Dune",
            author: "Frank Herbert",
            cover: "https://images.unsplash.com/photo-1593344484962-796055d4a3a4?auto=format&fit=crop&q=80&w=400",
            category: "Sci-Fi",
            rating: 4.9
        }
    ];

    const stats = [
        { label: "Borrowed", value: "24", icon: <Book size={18} />, color: "blue" },
        { label: "Active", value: "12", icon: <Clock size={18} />, color: "green" },
        { label: "Waitlist", value: "05", icon: <TrendingUp size={18} />, color: "orange" }
    ];

    return (
        <div className="hero-dashboard-wrapper">
            <div className="mobile-mockup-card">
                {/* Header */}
                <div className="md-header">
                    <div className="md-logo">
                        <div className="md-logo-icon">
                            <BookMarked size={18} />
                        </div>
                        <span className="md-logo-text">Lumina</span>
                    </div>
                </div>

                {/* Greeting */}
                <div className="md-greeting">
                    <h2>Hello Alex, Ready for a New Adventure?</h2>
                </div>

                {/* Stats Row */}
                <div className="md-stats-row">
                    {stats.map((stat, index) => (
                        <div key={index} className="md-stat-card">
                            <div className={`md-stat-icon ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className="md-stat-info">
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="md-search-container">
                    <div className="md-search-bar">
                        <Search size={18} className="md-search-icon" />
                        <input type="text" placeholder="Quick find..." readOnly />
                    </div>
                </div>

                {/* Recommended Section */}
                <div className="md-recommended">
                    <div className="md-section-header">
                        <h3>Recommended</h3>
                        <ArrowRight size={18} className="md-arrow-icon" />
                    </div>

                    <div className="md-books-grid">
                        {bookData.map(book => (
                            <div key={book.id} className="md-book-card">
                                <div className="md-cover-container">
                                    <img src={book.cover} alt={book.title} />
                                    <div className="md-rating-badge">
                                        <Star size={12} fill="#f59e0b" stroke="none" />
                                        <span>{book.rating}</span>
                                    </div>
                                </div>
                                <div className="md-book-details">
                                    <h4>{book.title}</h4>
                                    <p>{book.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="md-bottom-nav">
                    <div className="md-nav-item active">
                        <Home size={20} />
                        <span>Home</span>
                    </div>
                    <div className="md-nav-item">
                        <Book size={20} />
                        <span>Catalog</span>
                    </div>
                    <div className="md-nav-item">
                        <Bookmark size={20} />
                        <span>Bookmarks</span>
                    </div>
                    <div className="md-nav-item">
                        <User size={20} />
                        <span>Profile</span>
                    </div>
                </div>
            </div>

            {/* Background glowing effects to match the reference */}
            <div className="md-glow-top"></div>
        </div>
    );
};

export default HeroDashboard;
