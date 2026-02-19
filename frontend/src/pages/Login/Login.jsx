import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserPlus, Github, Chrome, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login - redirect to home for now
        console.log('Logging in with:', email, password);
        navigate('/Home');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-left">
                    <div className="overlay"></div>
                    <div className="content">
                        <div className="logo-placeholder">
                            <ShieldCheck size={40} />
                        </div>
                        <h2>Ready for your next <br /><span>adventure?</span></h2>
                        <p>Dive back into your world of stories and knowledge. Your personal digital sanctuary is just a sign-in away.</p>
                        <div className="stat-badges">
                            <div className="badge">
                                <span className="number">50k+</span>
                                <span className="label">E-Books</span>
                            </div>
                            <div className="badge">
                                <span className="number">12k+</span>
                                <span className="label">Active Readers</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="login-right">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="header">
                            <h1>Sign In</h1>
                            <p>Enter your details to access your account</p>
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                        >
                            <span>Sign In</span>
                            <ArrowRight size={20} />
                        </button>

                        <div className="divider">
                            <span>or continue with</span>
                        </div>

                        <div className="social-login">
                            <button type="button" className="social-btn">
                                <Chrome size={20} color="#EA4335" />
                                <span>Google</span>
                            </button>
                            <button type="button" className="social-btn">
                                <Github size={20} />
                                <span>Github</span>
                            </button>
                        </div>

                        <p className="signup-link">
                            New here? <Link to="/Contact"><UserPlus size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
            <div className="decoration-blob blob-1"></div>
            <div className="decoration-blob blob-2"></div>
        </div>
    );
};

export default Login;
