import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Login action
            login: async (email, password) => {
                set({ isLoading: true, error: null });

                try {
                    // Simulate API call - replace with real API
                    const response = await fetch('/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        set({
                            user: userData.user,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null,
                        });
                        return { success: true };
                    } else {
                        const errorData = await response.json();
                        set({
                            error: errorData.message || 'Login failed',
                            isLoading: false,
                        });
                        return { success: false, error: errorData.message };
                    }
                } catch (error) {
                    // For demo purposes, simulate login
                    const demoUsers = JSON.parse(localStorage.getItem('demo_users') || '[]');
                    const user = demoUsers.find(u => u.email === email && u.password === password);

                    if (user) {
                        const { password: _, ...userWithoutPassword } = user;
                        set({
                            user: userWithoutPassword,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null,
                        });
                        return { success: true };
                    } else {
                        set({
                            error: 'Invalid email or password',
                            isLoading: false,
                        });
                        return { success: false, error: 'Invalid email or password' };
                    }
                }
            },

            // Signup action
            signup: async (userData) => {
                set({ isLoading: true, error: null });

                try {
                    // Simulate API call - replace with real API
                    const response = await fetch('/api/auth/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),
                    });

                    if (response.ok) {
                        const result = await response.json();
                        set({
                            user: result.user,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null,
                        });
                        return { success: true };
                    } else {
                        const errorData = await response.json();
                        set({
                            error: errorData.message || 'Signup failed',
                            isLoading: false,
                        });
                        return { success: false, error: errorData.message };
                    }
                } catch (error) {
                    // For demo purposes, simulate signup
                    const demoUsers = JSON.parse(localStorage.getItem('demo_users') || '[]');

                    // Check if user already exists
                    if (demoUsers.find(u => u.email === userData.email)) {
                        set({
                            error: 'User already exists',
                            isLoading: false,
                        });
                        return { success: false, error: 'User already exists' };
                    }

                    // Create new user
                    const newUser = {
                        id: Date.now(),
                        ...userData,
                        createdAt: new Date().toISOString(),
                    };

                    demoUsers.push(newUser);
                    localStorage.setItem('demo_users', JSON.stringify(demoUsers));

                    const { password: _, ...userWithoutPassword } = newUser;
                    set({
                        user: userWithoutPassword,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                    return { success: true };
                }
            },

            // Logout action
            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    error: null,
                });
            },

            // Clear error
            clearError: () => {
                set({ error: null });
            },

            // Check if user is authenticated
            checkAuth: () => {
                const { user, isAuthenticated } = get();
                return isAuthenticated && user !== null;
            },
        }),
        {
            name: 'auth-storage',
            // Only persist user data, not sensitive information
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;