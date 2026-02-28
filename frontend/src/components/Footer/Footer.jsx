import React from 'react';
import './Footer.css';
import { Send, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="lumina-footer">
            <div className="footer-top-container">
                {/* Brand Column */}
                <div className="footer-col brand-col">
                    <div className="footer-logo">
                        <h2>Lumina</h2>
                    </div>
                    <p className="footer-desc">
                        Curating the world's most significant literary works for a digital age.
                        Accessible anywhere, anytime.
                    </p>
                </div>

                {/* Collections Column */}
                <div className="footer-col">
                    <h4>Collections</h4>
                    <ul className="footer-nav">
                        <li><Link to="/Catalog">Digital Firsts</Link></li>
                        <li><Link to="/Catalog">Historical Archives</Link></li>
                        <li><Link to="/Catalog">Scientific Journals</Link></li>
                        <li><Link to="/Catalog">Children's Literature</Link></li>
                    </ul>
                </div>

                {/* Resources Column */}
                <div className="footer-col">
                    <h4>Resources</h4>
                    <ul className="footer-nav">
                        <li><Link to="/About">Research Tools</Link></li>
                        <li><Link to="/About">Citational Guide</Link></li>
                        <li><Link to="/About">API Access</Link></li>
                        <li><Link to="/About">Library Network</Link></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div className="footer-col newsletter-col">
                    <h4>Newsletter</h4>
                    <p>Stay updated with our newest additions.</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Email address" />
                        <button type="submit" className="newsletter-btn">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom-container">
                <div className="footer-copyright">
                    <p>© {currentYear} Lumina Digital Library System. All rights reserved.</p>
                </div>
                <div className="footer-legal-links">
                    <Link to="#">Privacy Policy</Link>
                    <Link to="#">Terms of Service</Link>
                    <Link to="#">Cookie Settings</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
