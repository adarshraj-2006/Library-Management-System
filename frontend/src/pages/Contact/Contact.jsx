import React from 'react';
import './Contact.css';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Get in Touch</h1>
                <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-card">
                        <div className="info-icon">
                            <Mail size={24} />
                        </div>
                        <div className="info-details">
                            <h3>Email</h3>
                            <p>support@library.com</p>
                            <p>info@library.com</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <Phone size={24} />
                        </div>
                        <div className="info-details">
                            <h3>Phone</h3>
                            <p>+1 (555) 000-0000</p>
                            <p>Mon - Fri, 9am - 6pm</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <MapPin size={24} />
                        </div>
                        <div className="info-details">
                            <h3>Location</h3>
                            <p>123 Library Lane</p>
                            <p>Knowledge City, BK 45678</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-container">
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" placeholder="John Doe" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="john@example.com" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" placeholder="How can we help?" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows="5" placeholder="Your message here..." required></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                            <span>Send Message</span>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
