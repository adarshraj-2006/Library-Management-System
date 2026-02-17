
import React from 'react';
import './HeroDashboard.css';
import { Search, Book, Bookmark, MoreHorizontal } from 'lucide-react';

const HeroDashboard = () => {
    const bookData = [
        {
            id: 1,
            title: "Harry Potter",
            author: "J.K. Rowling",
            color: "color-1",
            cover: "https://images.unsplash.com/photo-1626618012641-bf8ca5e3fa85?auto=format&fit=crop&q=80&w=400",
            active: false
        },
        {
            id: 2,
            title: "Ramayan",
            author: "Valmiki",
            color: "color-2",
            cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
            active: true
        },
        {
            id: 3,
            title: "Atomic Habits",
            author: "James Clear",
            color: "color-3",
            cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=400",
            active: false
        }
    ];

    return (
        <div className="hero-dashboard-container animate-float">
            <div className="dashboard-frame">
                {/* Fake Sidebar */}
                <div className="dashboard-sidebar">
                    <div className="sidebar-dot red"></div>
                    <div className="sidebar-dot yellow"></div>
                    <div className="sidebar-dot green"></div>
                    <div className="sidebar-item active">
                        <Book size={20} />
                    </div>
                    <div className="sidebar-item">
                        <Bookmark size={20} />
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="dashboard-content">
                    {/* Fake Header */}
                    <div className="dashboard-header">
                        <div className="fake-search-bar">
                            <Search size={16} className="search-icon" />
                            <span>Search for books...</span>
                        </div>
                        <div className="user-avatar" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100)', backgroundSize: 'cover' }}></div>
                    </div>

                    {/* Book Cards Grid */}
                    <div className="dashboard-grid">
                        {bookData.map((book) => (
                            <div key={book.id} className={`dashboard-card ${book.active ? 'active-card' : ''}`}>
                                <div className="card-img-container">
                                    <img src={book.cover} alt={book.title} className="card-img" />
                                </div>
                                <div className="card-text">{book.title}</div>
                                <div style={{ fontSize: '10px', color: '#64748b' }}>{book.author}</div>
                                <button className="card-btn">Borrow</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="floating-badge badge-1">
                <span>📚 New Arrivals</span>
            </div>
            <div className="floating-badge badge-2">
                <span>✨ Best Sellers</span>
            </div>
        </div>
    );
};

export default HeroDashboard;
