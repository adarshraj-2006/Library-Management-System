
import React from 'react';
import './Footer.css';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, BookOpen, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-library">
            <div className="footer-content">
                {/* --- Section 1: Brand & About --- */}
                <div className="footer-section brand-section">
                    <div className="footer-logo">
                        <BookOpen size={28} className="footer-icon-main" />
                        <h2>LMS<span className="dot">.</span>Library</h2>
                    </div>
                    <p className="footer-text">
                        A sanctuary for knowledge seekers. Manage your books, discover new worlds,
                        and connect with a community of lifelong learners.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={18} /></a>
                        <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={18} /></a>
                        <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={18} /></a>
                        <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={18} /></a>
                    </div>
                </div>

                {/* --- Section 2: Quick Navigation --- */}
                <div className="footer-section links-section">
                    <h3>Explore</h3>
                    <ul className="footer-links">
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="/Catalog">Catalog</Link></li>
                        <li><Link to="/About">About Us</Link></li>
                        <li><Link to="/Contact">Contact</Link></li>
                        <li><Link to="/Login">Login / Sign Up</Link></li>
                    </ul>
                </div>

                {/* --- Section 3: Library Services --- */}
                <div className="footer-section services-section">
                    <h3>Services</h3>
                    <ul className="footer-links">
                        <li><a href="#">Book Reservation</a></li>
                        <li><a href="#">Digital Archives</a></li>
                        <li><a href="#">Study Rooms</a></li>
                        <li><a href="#">Events & Workshops</a></li>
                        <li><a href="#">Research Help</a></li>
                    </ul>
                </div>

                {/* --- Section 4: Contact Info --- */}
                <div className="footer-section contact-section">
                    <h3>Contact Us</h3>
                    <ul className="contact-list">
                        <li>
                            <MapPin size={18} className="contact-icon" />
                            <span>123 Knowledge Avenue, Education City, CA 90210</span>
                        </li>
                        <li>
                            <Phone size={18} className="contact-icon" />
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li>
                            <Mail size={18} className="contact-icon" />
                            <span>support@lmslibrary.com</span>
                        </li>
                        <li>
                            <Clock size={18} className="contact-icon" />
                            <span>Mon - Fri: 8:00 AM - 9:00 PM<br />Sat - Sun: 10:00 AM - 6:00 PM</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- Bottom Footer --- */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; {currentYear} LMS Library. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
