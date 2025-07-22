'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Store, Search, User, LogOut } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import { showToast } from '../utils/toast';
import styles from './Navbar.module.css';

export default function Navbar() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const { user, isAuthenticated, logout } = useAuthStore();
    const totalItems = getTotalItems();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        showToast('Logged out successfully', 'success');
        router.push('/');
    };

    return (
        <nav className={styles.navbar}>
            <div className="container">
                <div className={styles.navContainer}>
                    <Link href="/" className={styles.logo} onClick={() => setSearchQuery('')}>
                        <Store />
                        <span>ShopCart</span>
                    </Link>

                    <div className={styles.navRight}>
                        <form onSubmit={handleSearch} className={styles.searchContainer}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className={styles.searchInput}
                            />
                            <button type="submit" className={styles.searchButton}>
                                <Search />
                            </button>
                        </form>

                        <Link href="/cart" className={styles.cartLink}>
                            <ShoppingCart className={styles.cartIcon} />
                            {totalItems > 0 && (
                                <span className={styles.cartBadge}>{totalItems}</span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className={styles.userMenu}>
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className={styles.userButton}
                                >
                                    <User className={styles.userIcon} />
                                    <span className={styles.userName}>
                                        {user?.firstName || 'User'}
                                    </span>
                                </button>

                                {showUserMenu && (
                                    <div className={styles.userDropdown}>
                                        <div className={styles.userInfo}>
                                            <p className={styles.userFullName}>
                                                {user?.firstName} {user?.lastName}
                                            </p>
                                            <p className={styles.userEmail}>{user?.email}</p>
                                        </div>
                                        <hr className={styles.dropdownDivider} />
                                        <Link
                                            href="/profile"
                                            className={styles.dropdownItem}
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <User className={styles.dropdownIcon} />
                                            Profile
                                        </Link>
                                        <Link
                                            href="/orders"
                                            className={styles.dropdownItem}
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <ShoppingCart className={styles.dropdownIcon} />
                                            Orders
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className={styles.dropdownItem}
                                        >
                                            <LogOut className={styles.dropdownIcon} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={styles.authButtons}>
                                <Link href="/auth/login" className={styles.loginButton}>
                                    Login
                                </Link>
                                <Link href="/auth/signup" className={styles.signupButton}>
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}