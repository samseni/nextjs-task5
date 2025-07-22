'use client';

import { ShoppingCart, Star } from 'lucide-react';
import useCartStore from '../store/cartStore';
import { showToast } from '../utils/toast';
import { formatCurrency } from '../utils/currency';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        addToCart(product);
        showToast(`${product.name} added to cart!`, 'success');
    };

    return (
        <div className={styles.productCard}>
            <div className={styles.imageContainer}>
                <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                    loading="lazy"
                />
                <span className={styles.categoryBadge}>{product.category}</span>
            </div>

            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>

                <div className={styles.ratingContainer}>
                    <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={styles.star}
                                fill={i < Math.floor(product.rating) ? '#ffd700' : 'none'}
                            />
                        ))}
                    </div>
                    <span className={styles.rating}>{product.rating}</span>
                    <span className={styles.reviews}>({product.reviews.toLocaleString('en-IN')} reviews)</span>
                </div>

                <p className={styles.description}>{product.description}</p>

                <div className={styles.productFooter}>
                    <span className={styles.price}>{formatCurrency(product.price)}</span>

                    <button onClick={handleAddToCart} className={styles.addToCartBtn}>
                        <ShoppingCart className={styles.cartIcon} />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}