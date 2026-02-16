import React, { useState } from 'react';
import './Borrowpage.css';
import { User, Phone, Book, Calendar, CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import Borrowsuccessfully from '../../components/Borrowsuccessfully/Borrowsuccessfully';

const Borrowpage = () => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        memberId: '',
        email: '',
        phone: '',
        bookName: '',
        borrowDate: new Date().toISOString().split('T')[0],
        returnDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="success-container animate-fade-in">
                <Borrowsuccessfully />
            </div>
        );
    }

    return (
        <div className="borrow-page-wrapper">
            <div className="borrow-container">
                {/* Progress Bar */}
                <div className="progress-stepper">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`step ${step >= s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
                            <div className="step-number">
                                {step > s ? <CheckCircle size={20} /> : s}
                            </div>
                            <div className="step-label">
                                {s === 1 && 'Personal'}
                                {s === 2 && 'Contact'}
                                {s === 3 && 'Borrow info'}
                                {s === 4 && 'Summary'}
                            </div>
                            {s < 4 && <div className="step-line"></div>}
                        </div>
                    ))}
                </div>

                <div className="form-card animate-slide-up">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Personal Details */}
                        {step === 1 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <User className="step-icon" size={24} />
                                    <h2>Personal Details</h2>
                                </div>
                                <div className="input-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Member ID</label>
                                    <input
                                        type="text"
                                        name="memberId"
                                        placeholder="LIB-XXXXX"
                                        value={formData.memberId}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="yourname@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <button type="button" className="next-btn" onClick={nextStep} disabled={!formData.name || !formData.memberId || !formData.email}>
                                    Next <ChevronRight size={20} />
                                </button>
                            </div>
                        )}

                        {/* Step 2: Contact Details */}
                        {step === 2 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <Phone className="step-icon" size={24} />
                                    <h2>Contact Details</h2>
                                </div>
                                <div className="input-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="btn-row">
                                    <button type="button" className="back-btn" onClick={prevStep}>
                                        <ArrowLeft size={20} /> Back
                                    </button>
                                    <button type="button" className="next-btn" onClick={nextStep} disabled={!formData.phone}>
                                        Next <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Borrowing Information */}
                        {step === 3 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <Book className="step-icon" size={24} />
                                    <h2>Borrowing Information</h2>
                                </div>
                                <div className="input-group">
                                    <label>Book Name</label>
                                    <input
                                        type="text"
                                        name="bookName"
                                        placeholder="Enter book title"
                                        value={formData.bookName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Borrow Date</label>
                                        <div className="date-input">
                                            <Calendar className="calendar-icon" size={18} />
                                            <input
                                                type="date"
                                                name="borrowDate"
                                                value={formData.borrowDate}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label>Return Due Date</label>
                                        <div className="date-input">
                                            <Calendar className="calendar-icon" size={18} />
                                            <input
                                                type="date"
                                                name="returnDate"
                                                value={formData.returnDate}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-row">
                                    <button type="button" className="back-btn" onClick={prevStep}>
                                        <ArrowLeft size={20} /> Back
                                    </button>
                                    <button type="button" className="next-btn" onClick={nextStep} disabled={!formData.bookName || !formData.returnDate}>
                                        Next <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Confirmation Summary */}
                        {step === 4 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <CheckCircle className="step-icon" size={24} />
                                    <h2>Confirm Borrow</h2>
                                </div>
                                <div className="summary-card">
                                    <div className="summary-item">
                                        <span>Full Name:</span>
                                        <strong>{formData.name}</strong>
                                    </div>
                                    <div className="summary-item">
                                        <span>Member ID:</span>
                                        <strong>{formData.memberId}</strong>
                                    </div>
                                    <div className="summary-item">
                                        <span>Email:</span>
                                        <strong>{formData.email}</strong>
                                    </div>
                                    <div className="summary-item">
                                        <span>Phone:</span>
                                        <strong>{formData.phone}</strong>
                                    </div>
                                    <div className="summary-divider"></div>
                                    <div className="summary-item">
                                        <span>Book Name:</span>
                                        <strong>{formData.bookName}</strong>
                                    </div>
                                    <div className="summary-item">
                                        <span>Borrow Date:</span>
                                        <strong>{formData.borrowDate}</strong>
                                    </div>
                                    <div className="summary-item">
                                        <span>Return Date:</span>
                                        <strong>{formData.returnDate}</strong>
                                    </div>
                                </div>
                                <div className="btn-row">
                                    <button type="button" className="back-btn" onClick={prevStep}>
                                        <ArrowLeft size={20} /> Back
                                    </button>
                                    <button type="submit" className="confirm-btn">
                                        Confirm Borrow
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Borrowpage;
