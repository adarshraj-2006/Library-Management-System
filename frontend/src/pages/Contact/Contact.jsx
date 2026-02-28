import React, { useState } from 'react';
import './Contact.css';
import {
    Search,
    User,
    BookOpen,
    Smartphone,
    Settings,
    Rocket,
    ArrowRight,
    CheckCircle2,
    Lightbulb,
    Headset,
    Mail,
    Phone,
    MapPin,
    Send,
    Loader2,
    Map,
    CloudOff,
    Filter,
    Share2,
    Palette,
    BookOpenText,
    UserCircle,
    CreditCard,
    ShieldCheck,
    RefreshCw,
    ChevronDown,
    MessageSquare,
    HelpCircle
} from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/contacts', formData);
            setIsSubmitted(true);
            toast.success('Message sent! Our team will reach out soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        {
            icon: <UserCircle size={24} />,
            title: "Account & Login",
            desc: "Manage your profile, change passwords, and resolve authentication issues."
        },
        {
            icon: <CreditCard size={24} />,
            title: "Subscription",
            desc: "Information about pricing plans, billing cycles, and invoice management."
        },
        {
            icon: <Settings size={24} />,
            title: "Technical Issues",
            desc: "Troubleshoot loading errors, app crashes, or connectivity problems."
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Privacy & Security",
            desc: "Learn how we protect your data and manage your privacy preferences."
        },
        {
            icon: <RefreshCw size={24} />,
            title: "Sync & Devices",
            desc: "Connect your e-reader, tablet, or smartphone to your Lumina library."
        },
        {
            icon: <BookOpen size={24} />,
            title: "Content Library",
            desc: "Help with borrowing, returning, and requesting new digital titles."
        }
    ];

    const faqs = [
        {
            q: "How do I reset my password?",
            a: "To reset your password, go to the login page and click 'Forgot Password'. Enter your registered email address, and we'll send you a secure link to create a new one."
        },
        {
            q: "Can I share my Lumina account with family?",
            a: "Yes! Our 'Family' and 'Premium' plans allow for up to 5 individual profiles under one subscription, ensuring everyone gets their own personalized library."
        },
        {
            q: "What formats are supported for custom uploads?",
            a: "Lumina supports EPUB, PDF, and MOBI formats. For institutional users, we also support metadata imports via MARC21 and Dublin Core."
        },
        {
            q: "How do I cancel my subscription?",
            a: "You can cancel anytime from your 'Account Settings' under the 'Billing' tab. Your access will remain active until the end of your current billing period."
        },
        {
            q: "How do I return a borrowed book?",
            a: "Returning a book is easy. Simply go to your 'My Books' dashboard, find the title you wish to return, and click the 'Return' button. The title will immediately be removed from your active loans."
        },
        {
            q: "What happens if I return a book late?",
            a: "Lumina doesn't charge traditional late fees. However, if a book is overdue, you may be restricted from borrowing new titles until the current one is returned or renewed."
        },
        {
            q: "Can I suggest a book for the library?",
            a: "Absolutely! We love hearing from our readers. You can use the 'Request a Title' feature in the Catalog section to suggest books you'd like to see added to our digital collection."
        }
    ];

    const steps = [
        {
            num: "1",
            title: "Creating an Account",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
            points: [
                "Click the 'Get Started' button in the top navigation bar to open the registration panel.",
                "Enter your email and create a secure password, or use Single Sign-On via Google or Apple.",
                "Verify your email address via the link sent to your inbox to activate your library dashboard."
            ]
        },
        {
            num: "2",
            title: "Navigating Features",
            image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop",
            points: [
                "Use the Global Search at the top to find books, authors, or specific tags instantly.",
                "Access your Personal Collections from the left sidebar to organize your reading list.",
                "Click the Settings Cog to customize your reading experience (dark mode, font size, etc.)."
            ]
        }
    ];

    const guides = [
        {
            icon: <Map size={30} />,
            title: "Navigating Your Library",
            desc: "Learn how to organize shelves, tag your favorite genres, and customize your personal dashboard view."
        },
        {
            icon: <CloudOff size={30} />,
            title: "Setting up Offline Reading",
            desc: "Don't let a poor connection stop your story. Configure your devices for seamless offline access to your books."
        },
        {
            icon: <Filter size={30} />,
            title: "Mastering the Search Filters",
            desc: "Find exactly what you're looking for with advanced boolean searches and curated metadata filtering tools."
        },
        {
            icon: <Share2 size={30} />,
            title: "Social Lending & Sharing",
            desc: "Safely share your highlights and notes with book clubs or lend titles to friends using our encrypted sharing portal."
        },
        {
            icon: <Palette size={30} />,
            title: "Customizing Your Reader",
            desc: "Adjust fonts, line spacing, and themes to create the perfect reading environment for your eyes."
        },
        {
            icon: <BookOpenText size={30} />,
            title: "Annotation & Exporting",
            desc: "Learn how to export your research notes and citations directly to popular academic bibliography managers."
        }
    ];

    return (
        <div className="help-center-wrapper">
            <div className="nav-spacer"></div>

            <main className="help-main-content">
                {/* Enhanced Hero Header */}
                <section className="help-hero-centered">
                    <div className="hero-content-wrapper">
                        <span className="support-badge">Support Center</span>
                        <h1 className="hero-main-title">How can we help you today?</h1>
                        <p className="hero-sub-text">Search our knowledge base or browse the categories below to find answers to your questions.</p>

                        <div className="search-bar-enhanced">
                            <div className="search-input-box">
                                <Search size={22} className="search-icon-dim" />
                                <input type="text" placeholder="Describe your issue..." />
                                <button className="search-cta-btn">Search</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Popular Help Topics */}
                <section className="popular-topics-section">
                    <div className="topics-header">
                        <h2>Popular Help Topics</h2>
                        <p>Quick access to the most common support areas.</p>
                    </div>
                    <div className="topics-grid-enhanced">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="topic-glass-card group">
                                <div className="topic-icon-accent group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    {cat.icon}
                                </div>
                                <h3>{cat.title}</h3>
                                <p>{cat.desc}</p>
                                <a href="#" className="topic-browse-link">
                                    Browse Articles <ArrowRight size={14} />
                                </a>
                            </div>
                        ))}
                    </div>
                </section>



                {/* Section 2: Exceptional Support / Contact Form */}
                <div className="support-section-container">
                    <div className="support-image-box">
                        <img
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
                            alt="Support Specialist"
                            className="support-img"
                        />
                    </div>

                    <div className="support-form-content">
                        <div className="support-header-text">
                            <span className="support-label">Always here for you</span>
                            <h2>Our Exceptional Support</h2>
                            <p>
                                Our dedicated team of librarians and support specialists are here to ensure your reading experience is seamless.
                                Whether you're struggling with a download or need a recommendation, we've got you covered.
                            </p>
                        </div>

                        <div className="support-features">
                            <div className="feature-item">
                                <div className="check-icon-box">
                                    <CheckCircle2 size={16} />
                                </div>
                                <span>24/7 Availability via Chat & Email</span>
                            </div>
                            <div className="feature-item">
                                <div className="check-icon-box">
                                    <CheckCircle2 size={16} />
                                </div>
                                <span>Human-Centered Experts (No Bots)</span>
                            </div>
                        </div>

                        <div id="contact-form-anchor" className="contact-form-wrapper">
                            {isSubmitted ? (
                                <div className="form-success-state">
                                    <CheckCircle2 size={60} color="#3b82f6" />
                                    <h3>Message Received!</h3>
                                    <p>We've received your inquiry and our team will respond within 24 hours.</p>
                                    <button className="reset-form-btn" onClick={() => setIsSubmitted(false)}>Send Another Inquiry</button>
                                </div>
                            ) : (
                                <form className="support-form" onSubmit={handleSubmit}>
                                    <div className="input-row">
                                        <div className="input-group">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Adarsh Raj"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="adarsh@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label>Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            placeholder="How can we help?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Message</label>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            placeholder="Tell us more about your issue..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="contact-submit-btn" disabled={loading}>
                                        {loading ? <Loader2 className="animate-spin" /> : (
                                            <>
                                                <span>Contact Support</span>
                                                <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section 3: Bottom Full-Width Feature Section */}
                <div className="experience-feature-section">
                    <div className="feature-bg-overlay"></div>
                    <div className="feature-content-box">
                        <h2 className="feature-title">Experience Unmatched Assistance</h2>
                        <p className="feature-desc">
                            Lumina provides integrated help features right where you need them.
                            From instant search within your books to live expert consultations.
                        </p>

                        <div className="feature-cards-row">
                            <div className="glass-feature-card">
                                <div className="glass-card-header">
                                    <Lightbulb size={24} className="feature-icon-blue" />
                                    <h4>Fast Reply Suggestions</h4>
                                </div>
                                <p>Context-aware AI helps you find immediate solutions based on your current activity.</p>
                            </div>
                            <div className="glass-feature-card">
                                <div className="glass-card-header">
                                    <Headset size={24} className="feature-icon-blue" />
                                    <h4>24/7 Live Support</h4>
                                </div>
                                <p>Get connected to a real person at any hour. We never sleep so you can keep reading.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* NEW LATER SECTIONS */}

                {/* Section: Guides & Tutorials */}
                <section className="guides-section">
                    <div className="section-header-text">
                        <h2>Guides & Tutorials</h2>
                        <p>Step-by-step instructions to help you make the most of your digital reading experience.</p>
                    </div>
                    <div className="guides-grid">
                        {guides.map((guide, idx) => (
                            <div key={idx} className="guide-card">
                                <div className="guide-icon-box">
                                    {guide.icon}
                                </div>
                                <h3 className="guide-card-title">{guide.title}</h3>
                                <p className="guide-card-desc">{guide.desc}</p>
                                <a href="#" className="guide-read-more">
                                    Read More <ArrowRight size={14} />
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Step-by-Step Visual Guides */}
                <section className="visual-guides-section">
                    <div className="section-header-split">
                        <div>
                            <h2>Step-by-Step Guides</h2>
                            <p>Visual walkthroughs for our core platform actions.</p>
                        </div>
                        <button className="view-all-link">
                            View All Guides <ArrowRight size={18} />
                        </button>
                    </div>
                    <div className="visual-guides-grid">
                        {steps.map((step, idx) => (
                            <div key={idx} className="step-card">
                                <div className="step-card-header">
                                    <div className="step-number">{step.num}</div>
                                    <h3>{step.title}</h3>
                                </div>
                                <div className="step-content">
                                    <ul className="step-points">
                                        {step.points.map((pt, pIdx) => (
                                            <li key={pIdx}>
                                                <span className="pt-index">{pIdx + 1 < 10 ? `0${pIdx + 1}` : pIdx + 1}</span>
                                                <p>{pt}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="step-image-wrapper">
                                        <img src={step.image} alt={step.title} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section Moved to Last */}
                <section className="faq-main-section">
                    <div className="faq-header">
                        <h2>Frequently Asked Questions</h2>
                        <p>Can't find what you're looking for? Here are our most asked questions.</p>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, idx) => (
                            <details key={idx} className="faq-item group">
                                <summary className="faq-question">
                                    <h4>{faq.q}</h4>
                                    <ChevronDown size={20} className="group-open:rotate-180 transition-transform text-slate-400" />
                                </summary>
                                <div className="faq-answer">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Final Help Banner */}
                <section className="final-support-cta">
                    <div className="cta-inner">
                        <HelpCircle size={48} className="cta-icon-dim" />
                        <h2>Still need help? Our support team is available 24/7.</h2>
                        <div className="cta-btn-group">
                            <button className="chat-btn">
                                <MessageSquare size={18} /> Chat with Support
                            </button>
                            <button className="email-btn">
                                <Mail size={18} /> Email Us
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Contact;
