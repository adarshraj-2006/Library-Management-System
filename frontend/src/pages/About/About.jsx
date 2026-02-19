import React from 'react';
import { BookOpen, Target, Users, History, Heart, Shield } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-blob-1"></div>
            <div className="about-blob-2"></div>

            <div className="about-header animate-fade-in">
                <div className="about-badge">Welcome to Lumina</div>
                <h1>A Sanctuary for <br /><span>Lifelong Learners</span></h1>
                <p>Since 1995, we've been dedicated to serving our community with knowledge, inspiration, and a love for reading.</p>
            </div>

            <div className="about-content">
                <div className="mission-card animate-slide-up">
                    <div className="mission-icon">
                        <Target size={32} />
                    </div>
                    <div className="mission-text">
                        <h2>Our Mission</h2>
                        <p>
                            At Lumina, our mission is to provide equitable access to information, foster lifelong learning,
                            and create a welcoming space for discovery and community engagement. We believe
                            that libraries are the cornerstones of democracy and personal growth.
                        </p>
                    </div>
                </div>

                <div className="about-grid">
                    <div className="about-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="card-icon"><History size={24} /></div>
                        <h3>Our History</h3>
                        <p>Started as a small community book exchange, we have grown into a digital-first library serving thousands of readers every month.</p>
                    </div>
                    <div className="about-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="card-icon"><Shield size={24} /></div>
                        <h3>Our Values</h3>
                        <p>Knowledge, Accessibility, Privacy, and Community. These core values guide every decision we make and every service we provide.</p>
                    </div>
                    <div className="about-card animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <div className="card-icon"><Users size={24} /></div>
                        <h3>The Team</h3>
                        <p>Our dedicated librarians and technical staff work tirelessly to ensure you have the best reading experience possible.</p>
                    </div>
                    <div className="about-card animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <div className="card-icon"><Heart size={24} /></div>
                        <h3>Passion</h3>
                        <p>We are bibliophiles at heart. Our curation reflects our deep love for literature across all genres and languages.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
