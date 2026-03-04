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
    ArrowRight,
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
    BookMarked,
    Home as HomeIcon,
    Bookmark,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../services/api';
import './Dashboard.css';

const Dashboard = ({ isPanel = false, onClose }) => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Real Data State
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        borrowed: 0,
        pending: 0,
        overdue: 0,
        readerScore: 4.8
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            if (!isPanel) {
                toast.error('Please login to access dashboard');
                navigate('/Login');
            }
            return;
        }
        setUser(JSON.parse(storedUser));
        fetchDashboardData();
    }, [navigate, isPanel]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [issuesRes, booksRes] = await Promise.all([
                API.get('/issues/my'),
                API.get('/books?limit=5')
            ]);

            const issues = issuesRes.data.data.issues || [];
            const books = booksRes.data.data.books || [];

            setIssuedBooks(issues);
            setRecommendedBooks(books);

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
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        if (onClose) onClose();
        navigate('/Login');
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
    };

    // Panel mode — render a compact slide-in dashboard
    if (isPanel) {
        if (!user) {
            return (
                <div style={{ padding: '40px 28px', textAlign: 'center' }}>
                    <p style={{ color: '#64748b', marginBottom: 16 }}>Please sign in to view your dashboard</p>
                    <button
                        onClick={() => { if (onClose) onClose(); navigate('/Login'); }}
                        style={{
                            padding: '12px 32px',
                            background: '#0f172a',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: 14
                        }}
                    >
                        Sign In
                    </button>
                </div>
            );
        }

        const memberDate = user.createdAt
            ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : 'Feb 2025';

        const recentActivities = issuedBooks.slice(0, 5);

        return (
            <div className="dashboard-panel-inner">
                {/* Panel Header */}
                <div className="panel-header">
                    <div className="panel-header-left">
                        <img
                            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&bold=true`}
                            alt="user"
                            className="panel-header-avatar"
                        />
                        <div className="panel-header-info">
                            <h3>{user.name}</h3>
                            <span>{user.role}</span>
                        </div>
                    </div>
                    <button className="panel-close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* Nav Tabs */}
                <div className="panel-nav">
                    <button
                        className={`panel-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => switchTab('overview')}
                    >
                        <LayoutDashboard size={16} /> Overview
                    </button>
                    <button
                        className={`panel-nav-item ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => switchTab('history')}
                    >
                        <History size={16} /> Activity
                    </button>
                    <button
                        className={`panel-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => switchTab('profile')}
                    >
                        <User size={16} /> Profile
                    </button>
                </div>

                {/* Panel Content */}
                <div className="panel-content">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="animate-fade-in">
                            <div className="panel-stats-grid">
                                <div className="panel-stat">
                                    <span className="panel-stat-value">{stats.borrowed}</span>
                                    <span className="panel-stat-label">Borrowed</span>
                                </div>
                                <div className="panel-stat">
                                    <span className="panel-stat-value">{stats.pending}</span>
                                    <span className="panel-stat-label">Active</span>
                                </div>
                                <div className="panel-stat">
                                    <span className="panel-stat-value">{stats.overdue}</span>
                                    <span className="panel-stat-label">Overdue</span>
                                </div>
                            </div>

                            <p className="panel-section-title">Recent Activity</p>
                            {recentActivities.length > 0 ? (
                                recentActivities.map((activity, idx) => (
                                    <div className="panel-activity-item" key={activity._id || idx}>
                                        <div className={`panel-activity-icon ${activity.status === 'returned' ? 'returned' : (activity.isCurrentlyOverdue ? 'overdue' : 'borrowed')}`}>
                                            {activity.status === 'returned' ? <History size={18} /> : <BookOpen size={18} />}
                                        </div>
                                        <div className="panel-activity-info">
                                            <h4>{activity.book?.title || 'Unknown'}</h4>
                                            <span>{new Date(activity.updatedAt || activity.issuedDate).toLocaleDateString()}</span>
                                        </div>
                                        <span className={`panel-activity-badge ${activity.status === 'returned' ? 'returned' : 'active'}`}>
                                            {activity.status === 'returned' ? 'Returned' : 'Active'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: '#94a3b8', fontSize: 14, padding: '20px 0' }}>No recent activity</p>
                            )}

                            <div className="panel-actions-row">
                                <button className="panel-action-btn" onClick={() => { if (onClose) onClose(); navigate('/Catalog'); }}>
                                    <BookOpen size={16} /> Browse Books
                                </button>
                                <button className="panel-action-btn" onClick={() => { if (onClose) onClose(); navigate('/mybooks'); }}>
                                    <Bookmark size={16} /> My Books
                                </button>
                            </div>
                        </div>
                    )}

                    {/* History Tab */}
                    {activeTab === 'history' && (
                        <div className="animate-fade-in">
                            <p className="panel-section-title">All Transactions</p>
                            {issuedBooks.length > 0 ? (
                                issuedBooks.map((activity, idx) => (
                                    <div className="panel-activity-item" key={activity._id || idx}>
                                        <div className={`panel-activity-icon ${activity.status === 'returned' ? 'returned' : (activity.isCurrentlyOverdue ? 'overdue' : 'borrowed')}`}>
                                            {activity.status === 'returned' ? <History size={18} /> : <BookOpen size={18} />}
                                        </div>
                                        <div className="panel-activity-info">
                                            <h4>{activity.book?.title || 'Unknown'}</h4>
                                            <span>
                                                {activity.status === 'returned' ? 'Returned' : 'Due'}: {new Date(activity.status === 'returned' ? (activity.returnDate || activity.updatedAt) : activity.dueDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <span className={`panel-activity-badge ${activity.status === 'returned' ? 'returned' : 'active'}`}>
                                            {activity.status === 'returned' ? 'Returned' : 'Active'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: '#94a3b8', fontSize: 14, padding: '20px 0' }}>No transactions yet</p>
                            )}
                        </div>
                    )}

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="animate-fade-in">
                            <div className="panel-profile-section">
                                <img
                                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&bold=true&size=128`}
                                    alt="Profile"
                                    className="panel-profile-avatar"
                                />
                                <h3 className="panel-profile-name">{user.name}</h3>
                                <p className="panel-profile-email">{user.email}</p>
                            </div>

                            <div className="panel-profile-details">
                                <div className="panel-detail-row">
                                    <span className="panel-detail-label"><Mail size={15} /> Email</span>
                                    <span className="panel-detail-value">{user.email}</span>
                                </div>
                                <div className="panel-detail-row">
                                    <span className="panel-detail-label"><Phone size={15} /> Phone</span>
                                    <span className="panel-detail-value">{user.phone || 'Not set'}</span>
                                </div>
                                <div className="panel-detail-row">
                                    <span className="panel-detail-label"><ShieldCheck size={15} /> Status</span>
                                    <span className="panel-detail-value" style={{ color: '#10b981' }}>Active</span>
                                </div>
                                <div className="panel-detail-row">
                                    <span className="panel-detail-label"><CreditCard size={15} /> Member ID</span>
                                    <span className="panel-detail-value">LMS-{user._id ? user._id.substring(user._id.length - 8).toUpperCase() : '00000000'}</span>
                                </div>
                                <div className="panel-detail-row">
                                    <span className="panel-detail-label"><Calendar size={15} /> Joined</span>
                                    <span className="panel-detail-value">{memberDate}</span>
                                </div>
                            </div>

                            <div className="panel-actions-row">
                                <button className="panel-action-btn" onClick={() => switchTab('overview')}>
                                    <Settings size={16} /> Settings
                                </button>
                                <button className="panel-action-btn danger" onClick={handleLogout}>
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Fallback: if not panel mode, redirect to home (since route was removed)
    return null;
};

export default Dashboard;
