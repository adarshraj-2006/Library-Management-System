import React, { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    BookOpen,
    History,
    User,
    Settings,
    LogOut,
    Search,
    Bell,
    TrendingUp,
    Clock,
    Star,
    ChevronRight,
    ShieldCheck,
    CreditCard,
    Mail,
    Phone,
    Menu,
    Calendar,
    Award,
    BookMarked
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            toast.error('Please login to access dashboard');
            navigate('/Login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/Login');
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const switchTab = (tab) => {
        setActiveTab(tab);
        setSidebarOpen(false);
    };

    if (!user) return <div className="loading-screen">Loading...</div>;

    const memberDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : 'Jan 2024';

    return (
        <div className="dashboard-container">
            {/* Sidebar Overlay */}
            {sidebarOpen && <div className="dashboard-overlay" onClick={toggleSidebar}></div>}

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-logo">
                    <BookMarked className="logo-icon" />
                    <span>Lumina</span>
                </div>
                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => switchTab('overview')}
                    >
                        <LayoutDashboard size={20} />
                        <span>Overview</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'my-books' ? 'active' : ''}`}
                        onClick={() => { setSidebarOpen(false); navigate('/mybooks'); }}
                    >
                        <BookOpen size={20} />
                        <span>My Books</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => switchTab('history')}
                    >
                        <History size={20} />
                        <span>History</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => switchTab('profile')}
                    >
                        <User size={20} />
                        <span>Profile</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => switchTab('settings')}
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Top Header */}
                <header className="dashboard-header">
                    <button className="mobile-menu-btn" onClick={toggleSidebar}>
                        <Menu size={24} />
                    </button>
                    <div className="header-search">
                        <Search size={18} />
                        <input type="text" placeholder="Search books, authors, genres..." />
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn"><Bell size={20} /></button>
                        <div className="user-profile-header" onClick={() => setActiveTab('profile')}>
                            <img
                                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&bold=true`}
                                alt="user"
                            />
                            <div className="user-info">
                                <span className="user-name">{user.name}</span>
                                <span className="user-role">{user.role}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ─── OVERVIEW TAB ─── */}
                {activeTab === 'overview' && (
                    <div className="dashboard-content animate-fade-in">
                        <div className="welcome-banner">
                            <h1>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
                            <p>Here's what's happening with your library account today.</p>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon purple"><BookOpen size={24} /></div>
                                <div className="stat-info">
                                    <h3>12</h3>
                                    <p>Books Borrowed</p>
                                </div>
                                <div className="stat-trend positive"><TrendingUp size={14} /> +2 this month</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon orange"><Clock size={24} /></div>
                                <div className="stat-info">
                                    <h3>3</h3>
                                    <p>Pending Returns</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon blue"><Star size={24} /></div>
                                <div className="stat-info">
                                    <h3>4.8</h3>
                                    <p>Reader Score</p>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-grid">
                            <div className="recent-activity">
                                <div className="section-header">
                                    <h2>Recent Activity</h2>
                                    <button className="text-btn">View All</button>
                                </div>
                                <div className="activity-list">
                                    <div className="activity-item">
                                        <div className="activity-icon green"><ShieldCheck size={18} /></div>
                                        <div className="activity-details">
                                            <p>Borrowed <strong>"The Great Gatsby"</strong> from Fiction</p>
                                            <span>2 hours ago</span>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon blue"><History size={18} /></div>
                                        <div className="activity-details">
                                            <p>Returned <strong>"Atomic Habits"</strong> — 2 days early!</p>
                                            <span>Yesterday at 3:42 PM</span>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon red"><Bell size={18} /></div>
                                        <div className="activity-details">
                                            <p>Overdue reminder for <strong>"Clean Code"</strong></p>
                                            <span>3 days ago</span>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon green"><Award size={18} /></div>
                                        <div className="activity-details">
                                            <p>Earned <strong>"Bookworm"</strong> reader badge 🏅</p>
                                            <span>Last week</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="recommended-books">
                                <div className="section-header">
                                    <h2>Recommended</h2>
                                </div>
                                <div className="book-mini-list">
                                    {[
                                        { title: 'Deep Work', author: 'Cal Newport', id: 24 },
                                        { title: 'Sapiens', author: 'Yuval N. Harari', id: 36 },
                                        { title: 'Dune', author: 'Frank Herbert', id: 48 },
                                    ].map((book, i) => (
                                        <div className="book-mini-card" key={i}>
                                            <img src={`https://picsum.photos/id/${book.id}/60/80`} alt={book.title} />
                                            <div className="book-mini-info">
                                                <h4>{book.title}</h4>
                                                <p>{book.author}</p>
                                            </div>
                                            <ChevronRight size={18} className="chevron" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── PROFILE TAB ─── */}
                {activeTab === 'profile' && (
                    <div className="profile-content animate-fade-in">
                        <div className="profile-card">
                            <div className="profile-cover"></div>
                            <div className="profile-header-main">
                                <div className="profile-img-container">
                                    <img
                                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&bold=true&size=128`}
                                        alt="Profile"
                                    />
                                    <button className="edit-img-btn"><Calendar size={14} /></button>
                                </div>
                                <div className="profile-identity">
                                    <h2>{user.name}</h2>
                                    <p>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} • Member since {memberDate}</p>
                                </div>
                                <button className="edit-profile-btn">Edit Profile</button>
                            </div>

                            <div className="profile-info-grid">
                                <div className="info-group">
                                    <label><Mail size={16} /> Email Address</label>
                                    <p>{user.email}</p>
                                </div>
                                <div className="info-group">
                                    <label><Phone size={16} /> Phone Number</label>
                                    <p>{user.phone || 'Not provided'}</p>
                                </div>
                                <div className="info-group">
                                    <label><ShieldCheck size={16} /> Account Status</label>
                                    <p><span className="status-badge active">Active</span></p>
                                </div>
                                <div className="info-group">
                                    <label><CreditCard size={16} /> Membership ID</label>
                                    <p>LMS-{user._id ? user._id.substring(user._id.length - 8).toUpperCase() : '00000000'}</p>
                                </div>
                            </div>

                            <div className="profile-stats-tabs">
                                <div className="profile-stat-box">
                                    <h4>12</h4>
                                    <span>Books Read</span>
                                </div>
                                <div className="profile-stat-box">
                                    <h4>4</h4>
                                    <span>Active Loans</span>
                                </div>
                                <div className="profile-stat-box">
                                    <h4>₹0</h4>
                                    <span>Fines Owed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
