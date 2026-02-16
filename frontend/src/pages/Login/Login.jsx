import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isHovered, setIsHovered] = useState(false);
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
                        <h2>Welcome Back!</h2>
                        <p>Dive back into your world of stories and knowledge. Your personal library awaits.</p>
                        <div className="stat-badges">
                            <div className="badge">
                                <span className="number">50k+</span>
                                <span className="label">Books</span>
                            </div>
                            <div className="badge">
                                <span className="number">10k+</span>
                                <span className="label">Users</span>
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
                            <input
                                type="email"
                                id="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
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
                            className={`login-btn ${isHovered ? 'hover' : ''}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Log In
                        </button>

                        <div className="divider">
                            <span>or continue with</span>
                        </div>

                        <div className="social-login">
                            <button type="button" className="social-btn google">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                                Google
                            </button>
                            <button type="button" className="social-btn github">
                                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="Github" />
                                Github
                            </button>
                        </div>

                        <p className="signup-link">
                            Don't have an account? <Link to="/Contact">Join us library</Link>
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
