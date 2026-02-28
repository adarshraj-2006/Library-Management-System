import React from 'react';
import './About.css';
import { Accessibility, Sparkles, Users, Mail, Share2, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="about-page-wrapper">
            {/* Nav Padding Spacer */}
            <div className="nav-spacer"></div>

            {/* Hero Section */}
            <header className="about-hero">
                <div className="about-hero-content">
                    <span className="about-badge">About Lumina</span>
                    <h1 className="about-title">Our Mission to Inspire Knowledge</h1>
                    <p className="about-subtitle">
                        We believe that access to information is a fundamental right.
                        Lumina is dedicated to curating the world's most influential
                        digital works to empower learners everywhere.
                    </p>
                </div>
            </header>

            <main className="about-main">
                {/* Our Story Section */}
                <section className="story-section">
                    <div className="story-container">
                        <div className="story-image-wrapper">
                            <div className="image-accent-box"></div>
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKPpFD75U31HWXfkI1vbxCXrn2A-OjTDyryEf2FWYvfWXJaA53pLxTmCdG3vkgkI-UChRr9nv5Olzjp_bV-ai7iodiX1c0LDe_1TCl6u31wZm3WXJYzyV8GasrI_uic8A6pMAlbcVNXgUi7qEhkDVQvALDenSQUzJK79PZye0R0nkUGn_3kdMs39bZPj7yW27ZS7eE48mdkQpKc-cByOrx3fJpW21ObzUsGT7BgQuxNdpkLp6QzimLwv7Dy7QJTzeG5vaUU7_3kI8F"
                                alt="Modern library illustration"
                                className="story-image"
                            />
                        </div>
                        <div className="story-text">
                            <h3>Our Story</h3>
                            <p>
                                Founded in 2018, Lumina began as a small project between a group of passionate bibliophiles
                                and software engineers who noticed a gap in the digital lending space. We wanted a
                                platform that combined the warmth of a physical library with the efficiency of modern technology.
                            </p>
                            <p>
                                Over the years, we've grown from a collection of a few hundred public domain titles to a massive
                                digital repository housing millions of works across every discipline imaginable. Today,
                                we serve a global community of students, researchers, and casual readers.
                            </p>
                            <div className="button-group">
                                <button className="read-history-btn">Read Full History</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="values-section">
                    <div className="values-header">
                        <h3>Our Core Values</h3>
                        <p>These principles guide every decision we make, from the books we acquire to the features we build.</p>
                    </div>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon-box blue-theme">
                                <Accessibility size={30} />
                            </div>
                            <h4>Universal Accessibility</h4>
                            <p>We are committed to making our collection available to everyone, regardless of physical ability or geographic location.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon-box green-theme">
                                <Sparkles size={30} />
                            </div>
                            <h4>Thoughtful Curation</h4>
                            <p>We don't just collect data; we curate knowledge. Our librarians hand-select titles that provide lasting value and insight.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon-box purple-theme">
                                <Users size={30} />
                            </div>
                            <h4>Community First</h4>
                            <p>Lumina is built for the community. We foster discussions, reading circles, and collaborative research to bring people together.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
