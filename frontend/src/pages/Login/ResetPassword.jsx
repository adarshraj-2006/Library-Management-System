import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Loader2, BookMarked, ArrowLeft } from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import '../Login/Login.css';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }

        setLoading(true);
        try {
            await API.post(`auth/reset-password/${token}`, {
                password: formData.password
            });
            toast.success('Password reset successful! Please login.');
            navigate('/Login');
        } catch (error) {
            console.error(error.response?.data?.message || 'Failed to reset password');
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
                    <h1>Create new password</h1>
                    <p>Please enter your new password below</p>
                </div>

                <form className="login-auth-form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <Lock size={18} className="field-icon" />
                        <input
                            type="password"
                            name="password"
                            placeholder="New Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <Lock size={18} className="field-icon" />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : 'Reset Password'}
                    </button>

                    <button type="button" className="back-to-login" onClick={() => navigate('/Login')}>
                        <ArrowLeft size={16} /> Back to Login
                    </button>
                </form>
            </div>

            <div className="bg-decoration">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
            </div>
        </div>
    );
};

export default ResetPassword;
