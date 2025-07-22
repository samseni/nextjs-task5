// Demo users for development
export const createDemoUser = () => {
    const demoUser = {
        email: 'demo@shopcart.com',
        password: 'demo123',
        firstName: 'Demo',
        lastName: 'User',
        phone: '+1234567890',
        id: 1,
        createdAt: new Date().toISOString(),
    };

    const existingUsers = JSON.parse(localStorage.getItem('demo_users') || '[]');
    if (!existingUsers.find(u => u.email === demoUser.email)) {
        existingUsers.push(demoUser);
        localStorage.setItem('demo_users', JSON.stringify(existingUsers));
    }
};

// Initialize demo user on page load
if (typeof window !== 'undefined') {
    createDemoUser();
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 6;
};

export const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
};