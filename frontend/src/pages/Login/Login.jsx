import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, Github, Chrome, Facebook, Apple, Loader2, BookMarked } from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgot, setIsForgot] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isForgot) {
                await API.post('/auth/forgot-password', { email: formData.email });
                toast.success('Reset link sent! Please check your email inbox.');
                setIsForgot(false);
                setIsLogin(true);
            } else if (isLogin) {
                const res = await API.post('/auth/login', {
                    email: formData.email,
                    password: formData.password
                });
                localStorage.setItem('accessToken', res.data.data.accessToken);
                localStorage.setItem('user', JSON.stringify(res.data.data.user));
                toast.success('Welcome back!');
                navigate('/Home');
            } else {
                await API.post('/auth/register', formData);
                toast.success('Registration successful! Please verify your email.');
                setIsLogin(true);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(errorMsg);
            console.error('Auth Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTitle = () => {
        if (isForgot) return 'Reset password';
        return isLogin ? 'Sign in with email' : 'Create an account';
    };

    const getSubtitle = () => {
        if (isForgot) return 'Enter your email to receive a password reset link';
        return isLogin ? 'Enter your details to access your account' : 'Fill in the information to get started';
    };

    return (
        <div className="login-container">
            <div className="login-box animate-fade-in">
                <div className="login-header">
                    <div className="login-logo-box">
                        <BookMarked size={28} />
                    </div>
                    <h1>{getTitle()}</h1>
                    <p>{getSubtitle()}</p>
                </div>

                <form className="login-auth-form" onSubmit={handleSubmit}>
                    {!isLogin && !isForgot && (
                        <div className="input-field">
                            <User size={18} className="field-icon" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="input-field">
                        <Mail size={18} className="field-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!isLogin && !isForgot && (
                        <div className="input-field">
                            <Phone size={18} className="field-icon" />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {!isForgot && (
                        <div className="input-field">
                            <Lock size={18} className="field-icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {isLogin && !isForgot && (
                        <div className="forgot-link">
                            <button type="button" className="text-link" onClick={() => setIsForgot(true)}>
                                Forgot password?
                            </button>
                        </div>
                    )}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : (
                            isForgot ? 'Send Reset Link' : (isLogin ? 'Get Started' : 'Sign Up')
                        )}
                    </button>

                    {isForgot && (
                        <button type="button" className="back-to-login" onClick={() => setIsForgot(false)}>
                            Back to Login
                        </button>
                    )}
                </form>

                <div className="social-divider">
                    <span>Or {isLogin ? 'sign in' : 'sign up'} with</span>
                </div>

                <div className="social-grid">
                    <button className="social-icon-btn"><Chrome size={20} /></button>
                    <button className="social-icon-btn"><Facebook size={20} /></button>
                    <button className="social-icon-btn"><Apple size={20} /></button>
                </div>

                <div className="toggle-auth">
                    {isLogin ? (
                        <p>Don't have an account? <span onClick={() => { setIsLogin(false); setIsForgot(false); }}>Sign up</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => { setIsLogin(true); setIsForgot(false); }}>Sign in</span></p>
                    )}
                </div>
            </div>

            <div className="bg-decoration">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
            </div>
        </div>
    );
};

export default Login;
