import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, Github, Chrome, Facebook, Apple, Loader2, BookMarked } from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
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
            if (isLogin) {
                const res = await API.post('/auth/login', {
                    email: formData.email,
                    password: formData.password
                });
                localStorage.setItem('accessToken', res.data.data.accessToken);
                localStorage.setItem('user', JSON.stringify(res.data.data.user));
                toast.success('Welcome back!');
                navigate('/dashboard');
            } else {
                await API.post('/auth/register', formData);
                toast.success('Registration successful! Please verify your email.');
                setIsLogin(true);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.errors
                ? error.response.data.errors.join(", ")
                : (error.response?.data?.message || 'Something went wrong');
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box animate-fade-in">
                <div className="login-header">
                    <div className="login-logo-box">
                        <BookMarked size={28} />
                    </div>
                    <h1>{isLogin ? 'Sign in with email' : 'Create an account'}</h1>
                    <p>{isLogin ? 'Enter your details to access your account' : 'Fill in the information to get started'}</p>
                </div>

                <form className="login-auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
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

                    {!isLogin && (
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

                    {isLogin && (
                        <div className="forgot-link">
                            <a href="#">Forgot password?</a>
                        </div>
                    )}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Get Started' : 'Sign Up')}
                    </button>
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
                        <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Sign up</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => setIsLogin(true)}>Sign in</span></p>
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
