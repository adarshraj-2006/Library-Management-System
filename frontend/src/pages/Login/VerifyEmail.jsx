import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, BookMarked, CheckCircle2, XCircle } from 'lucide-react';
import API from '../../services/api';
import '../Login/Login.css';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error

    useEffect(() => {
        const verify = async () => {
            try {
                await API.get(`/auth/verify-email/${token}`);
                setStatus('success');
                setTimeout(() => navigate('/Login'), 3000);
            } catch (error) {
                setStatus('error');
            }
        };
        verify();
    }, [token, navigate]);

    return (
        <div className="login-container">
            <div className="login-box animate-fade-in">
                <div className="login-header">
                    <div className="login-logo-box">
                        <BookMarked size={28} />
                    </div>

                    {status === 'verifying' && (
                        <>
                            <h1>Verifying your email</h1>
                            <p>Please wait while we confirm your account...</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div style={{ color: '#22c55e', marginBottom: 20 }}>
                                <CheckCircle2 size={60} style={{ margin: '0 auto' }} />
                            </div>
                            <h1>Email Verified!</h1>
                            <p>Your account is now active. Redirecting to login...</p>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div style={{ color: '#ef4444', marginBottom: 20 }}>
                                <XCircle size={60} style={{ margin: '0 auto' }} />
                            </div>
                            <h1>Verification Failed</h1>
                            <p>The link may be invalid or expired. Please try registering again.</p>
                            <button
                                className="submit-btn"
                                style={{ marginTop: 20 }}
                                onClick={() => navigate('/Login')}
                            >
                                Back to Sign In
                            </button>
                        </>
                    )}
                </div>

                {status === 'verifying' && (
                    <div style={{ padding: '20px 0' }}>
                        <Loader2 className="animate-spin" size={40} style={{ margin: '0 auto', color: '#1f2937' }} />
                    </div>
                )}
            </div>

            <div className="bg-decoration">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
            </div>
        </div>
    );
};

export default VerifyEmail;
