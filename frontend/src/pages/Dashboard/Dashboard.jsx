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
import API from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Real Data State
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        borrowed: 0,
        pending: 0,
        overdue: 0,
        readerScore: 4.8 // Base score
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            toast.error('Please login to access dashboard');
            navigate('/Login');
            return;
        }
        setUser(JSON.parse(storedUser));
        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [issuesRes, booksRes] = await Promise.all([
                API.get('/issues/my'),
                API.get('/books?limit=5')
            ]);

            const issues = issuesRes.data.data.issues || [];
            const books = booksRes.data.data.books || [];

            console.log("Dashboard Stats - Issues:", issues);
            console.log("Dashboard Stats - Recommended Books:", books);

            setIssuedBooks(issues);
            setRecommendedBooks(books);

            // Calculate Stats
            const borrowed = issues.length;
            const pending = issues.filter(i => i.status === 'issued').length;
            const overdue = issues.filter(i => i.status === 'overdue' || i.isCurrentlyOverdue).length;

            setStats(prev => ({
                ...prev,
                borrowed,
                pending,
                overdue
            }));

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

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
        : 'Feb 2025';

    const recentActivities = issuedBooks.slice(0, 4);

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
                                    <h3>{stats.borrowed}</h3>
                                    <p>Books Borrowed</p>
                                </div>
                                {stats.borrowed > 0 && <div className="stat-trend positive"><TrendingUp size={14} /> Active Account</div>}
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon orange"><Clock size={24} /></div>
                                <div className="stat-info">
                                    <h3>{stats.pending}</h3>
                                    <p>Pending Returns</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon blue"><Star size={24} /></div>
                                <div className="stat-info">
                                    <h3>{stats.overdue}</h3>
                                    <p>Overdue Books</p>
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
                                    {recentActivities.length > 0 ? (
                                        recentActivities.map((activity, idx) => (
                                            <div className="activity-item" key={activity._id || idx}>
                                                <div className={`activity-icon ${activity.status === 'returned' ? 'blue' : (activity.isCurrentlyOverdue ? 'red' : 'green')}`}>
                                                    {activity.status === 'returned' ? <History size={18} /> : <ShieldCheck size={18} />}
                                                </div>
                                                <div className="activity-details">
                                                    <p>
                                                        {activity.status === 'returned' ? 'Returned' : 'Borrowed'}
                                                        <strong> "{activity.book?.title || 'Unknown'}"</strong>
                                                    </p>
                                                    <span>{new Date(activity.updatedAt || activity.issuedDate).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-data">No recent activity found.</p>
                                    )}
                                </div>
                            </div>

                            <div className="recommended-books">
                                <div className="section-header">
                                    <h2>Recommended</h2>
                                </div>
                                <div className="book-mini-list">
                                    {recommendedBooks.length > 0 ? (
                                        recommendedBooks.map((book) => (
                                            <div className="book-mini-card" key={book._id} onClick={() => navigate('/Catalog')}>
                                                <img
                                                    src={book.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(book.title)}&background=random`}
                                                    alt={book.title}
                                                />
                                                <div className="book-mini-info">
                                                    <h4>{book.title}</h4>
                                                    <p>{book.author}</p>
                                                </div>
                                                <ChevronRight size={18} className="chevron" />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-data">Browse our catalog for books.</p>
                                    )}
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
                                    <h4>{stats.borrowed}</h4>
                                    <span>Books Borrowed</span>
                                </div>
                                <div className="profile-stat-box">
                                    <h4>{stats.pending}</h4>
                                    <span>Active Loans</span>
                                </div>
                                <div className="profile-stat-box">
                                    <h4>{stats.overdue}</h4>
                                    <span>Overdue</span>
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
