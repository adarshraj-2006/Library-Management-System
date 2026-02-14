import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About Our Library</h1>
                <p>Serving our community with knowledge, inspiration, and a love for reading since 1995.</p>
            </div>

            <div className="about-content">
                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to provide equitable access to information, foster lifelong learning,
                        and create a welcoming space for discovery and community engagement. We believe
                        that libraries are the cornerstones of democracy and personal growth.
                    </p>
                </div>

                <div className="about-grid">
                    <div className="about-card">
                        <h3>Our History</h3>
                        <p>Started as a small community book exchange, we have grown into a digital-first library serving thousands of readers every month.</p>
                    </div>
                    <div className="about-card">
                        <h3>Our Values</h3>
                        <p>Knowledge, Accessibility, Privacy, and Community. These core values guide every decision we make and every service we provide.</p>
                    </div>
                    <div className="about-card">
                        <h3>The Team</h3>
                        <p>Our dedicated librarians and technical staff work tirelessly to ensure you have the best reading experience possible.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
