'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { showToast } from '../../utils/toast';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        const result = await login(formData.email, formData.password);

        if (result.success) {
            showToast('Login successful!', 'success');
            router.push('/');
        } else {
            showToast(result.error || 'Login failed', 'error');
        }
    };

    const handleDemoLogin = () => {
        setFormData({
            email: 'demo@shopcart.com',
            password: 'demo123'
        });
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.loginHeader}>
                        <Link href="/" className={styles.logo}>
                            <div className={styles.logoIcon}>🛒</div>
                            <span>ShopCart</span>
                        </Link>
                        <h1 className={styles.title}>Welcome Back</h1>
                        <p className={styles.subtitle}>Sign in to your account to continue shopping</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.loginForm}>
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
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.inputIcon} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
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

                        <div className={styles.formOptions}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className={styles.checkbox}
                                />
                                <span>Remember me</span>
                            </label>
                            <Link href="/auth/forgot-password" className={styles.forgotPassword}>
                                Forgot password?
                            </Link>
                        </div>

                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={styles.loginButton}
                        >
                            {isLoading ? (
                                <span>Signing in...</span>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className={styles.buttonIcon} />
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            className={styles.demoButton}
                        >
                            Try Demo Account
                        </button>
                    </form>

                    <div className={styles.loginFooter}>
                        <p>
                            Don't have an account?{' '}
                            <Link href="/auth/signup" className={styles.signupLink}>
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>

                <div className={styles.loginImage}>
                    <div className={styles.imageContent}>
                        <h2>Shop with Confidence</h2>
                        <p>Discover amazing products at unbeatable prices with our secure shopping experience.</p>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>🔒</span>
                                <span>Secure Payments</span>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>🚚</span>
                                <span>Fast Delivery</span>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>⭐</span>
                                <span>Top Quality</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}