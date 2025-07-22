'use client';

import styles from './CategoryFilter.module.css';

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
    return (
        <div className={styles.categoryFilter}>
            <div className="container">
                <div className={styles.categoryButtons}>
                    {categories.map(category => (
                        <button
                            key={category.name}
                            onClick={() => onCategoryChange(category.name)}
                            className={`${styles.categoryBtn} ${
                                selectedCategory === category.name ? styles.active : ''
                            }`}
                        >
                            <span className={styles.categoryName}>{category.name}</span>
                            <span className={styles.categoryCount}>({category.count})</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}