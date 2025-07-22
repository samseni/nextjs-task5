'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { showToast } from '../../utils/toast';
import styles from './page.module.css';

export default function SignupPage() {
    const router = useRouter();
    const { signup, isLoading, error, clearError, isAuthenticated } = useAuthStore();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    // Clear errors when component mounts
    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.firstName.trim()) {
            showToast('First name is required', 'error');
            return false;
        }
        if (!formData.lastName.trim()) {
            showToast('Last name is required', 'error');
            return false;
        }
        if (!formData.email.trim()) {
            showToast('Email is required', 'error');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showToast('Please enter a valid email address', 'error');
            return false;
        }
        if (!formData.phone.trim()) {
            showToast('Phone number is required', 'error');
            return false;
        }
        if (formData.password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            showToast('Passwords do not match', 'error');
            return false;
        }
        if (!agreeToTerms) {
            showToast('Please agree to the terms and conditions', 'error');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const { confirmPassword, ...userData } = formData;
        const result = await signup(userData);

        if (result.success) {
            showToast('Account created successfully!', 'success');
            router.push('/');
        } else {
            showToast(result.error || 'Signup failed', 'error');
        }
    };

    return (
        <div className={styles.signupPage}>
            <div className={styles.signupContainer}>
                <div className={styles.signupCard}>
                    <div className={styles.signupHeader}>
                        <Link href="/" className={styles.logo}>
                            <div className={styles.logoIcon}>🛒</div>
                            <span>ShopCart</span>
                        </Link>
                        <h1 className={styles.title}>Create Account</h1>
                        <p className={styles.subtitle}>Join ShopCart and start your shopping journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.signupForm}>
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="firstName" className={styles.label}>First Name</label>
                                <div className={styles.inputWrapper}>
                                    <User className={styles.inputIcon} />
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="First name"
                                        className={styles.input}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="lastName" className={styles.label}>Last Name</label>
                                <div className={styles.inputWrapper}>
                                    <User className={styles.inputIcon} />
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Last name"
                                        className={styles.input}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address</label>
                            <div className={styles.inputWrapper}>
                                <Mail className={styles.inputIcon} />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="phone" className={styles.label}>Phone Number</label>
                            <div className={styles.inputWrapper}>
                                <Phone className={styles.inputIcon} />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.inputIcon} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Create a password"
                                    className={styles.input}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.passwordToggle}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.inputIcon} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
                                    className={styles.input}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className={styles.passwordToggle}
                                >
                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.termsSection}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className={styles.checkbox}
                                />
                                <span>
                                    I agree to the{' '}
                                    <Link href="/terms" className={styles.link}>Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={styles.signupButton}
                        >
                            {isLoading ? (
                                <span>Creating Account...</span>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className={styles.buttonIcon} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className={styles.signupFooter}>
                        <p>
                            Already have an account?{' '}
                            <Link href="/auth/login" className={styles.loginLink}>
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                <div className={styles.signupImage}>
                    <div className={styles.imageContent}>
                        <h2>Join ShopCart Community</h2>
                        <p>Get access to exclusive deals, fast shipping, and premium customer support.</p>
                        <div className={styles.benefits}>
                            <div className={styles.benefit}>
                                <span className={styles.benefitIcon}>💳</span>
                                <div>
                                    <h3>Secure Checkout</h3>
                                    <p>Your payment information is always safe</p>
                                </div>
                            </div>
                            <div className={styles.benefit}>
                                <span className={styles.benefitIcon}>🎁</span>
                                <div>
                                    <h3>Exclusive Offers</h3>
                                    <p>Get access to member-only deals</p>
                                </div>
                            </div>
                            <div className={styles.benefit}>
                                <span className={styles.benefitIcon}>🚀</span>
                                <div>
                                    <h3>Fast Delivery</h3>
                                    <p>Quick and reliable shipping options</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}