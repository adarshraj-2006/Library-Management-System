
import React from 'react';
import './HeroDashboard.css';
import { Search, Book, Bookmark, TrendingUp, Users, Clock, ArrowRight, Star } from 'lucide-react';

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
        { label: "Borrowed", value: "24", icon: <Book size={14} />, color: "#3b82f6" },
        { label: "Active", value: "12", icon: <Clock size={14} />, color: "#10b981" },
        { label: "Waitlist", value: "05", icon: <TrendingUp size={14} />, color: "#f59e0b" }
    ];

    return (
        <div className="hero-dashboard-wrapper">
            <div className="dashboard-glass-card">
                {/* Dashboard Sidebar */}
                <div className="glass-sidebar">
                    <div className="status-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <div className="nav-items">
                        <div className="nav-item active"><Book size={18} /></div>
                        <div className="nav-item"><Bookmark size={18} /></div>
                        <div className="nav-item"><Users size={18} /></div>
                    </div>
                </div>

                {/* Dashboard Main Content */}
                <div className="glass-main">
                    <header className="glass-header">
                        <div className="glass-search">
                            <Search size={14} className="search-icon" />
                            <input type="text" placeholder="Quick find..." readOnly />
                        </div>
                        <div className="header-actions">
                            <div className="pulse-indicator"></div>
                            <div className="avatar">A</div>
                        </div>
                    </header>

                    <div className="dashboard-scrollable">
                        <section className="stats-row">
                            {stats.map((stat, i) => (
                                <div key={i} className="stat-pill" style={{ '--accent': stat.color }}>
                                    <span className="pill-icon">{stat.icon}</span>
                                    <div className="pill-info">
                                        <span className="pill-val">{stat.value}</span>
                                        <span className="pill-lbl">{stat.label}</span>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="featured-section">
                            <div className="section-head">
                                <h4>Recommended</h4>
                                <ArrowRight size={14} />
                            </div>
                            <div className="books-mini-grid">
                                {bookData.map((book) => (
                                    <div key={book.id} className="mini-book-card">
                                        <div className="book-thumb">
                                            <img src={book.cover} alt={book.title} />
                                            <div className="rating-tag">
                                                <Star size={10} fill="#f59e0b" stroke="none" />
                                                {book.rating}
                                            </div>
                                        </div>
                                        <div className="book-meta">
                                            <h5>{book.title}</h5>
                                            <p>{book.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="glass-blob blob-1"></div>
            <div className="glass-blob blob-2"></div>

            <div className="floating-stat-card card-1">
                <div className="activity-pulse"></div>
                <div className="stat-content">
                    <span className="stat-title">New Entry</span>
                    <span className="stat-desc">"Sapiens" returned</span>
                </div>
            </div>
        </div>
    );
};

export default HeroDashboard;
