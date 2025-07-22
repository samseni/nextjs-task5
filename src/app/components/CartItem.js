'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import useCartStore from '../store/cartStore';
import { showToast } from '../utils/toast';
import { formatCurrency } from '../utils/currency';
import styles from './CartItem.module.css';

export default function CartItem({ item }) {
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const handleRemove = () => {
        removeFromCart(item.id);
        showToast('Item removed from cart', 'success');
    };

    return (
        <div className={styles.cartItem}>
            <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
            />

            <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>{formatCurrency(item.price)}</p>
            </div>

            <div className={styles.quantityControls}>
                <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={styles.quantityBtn}
                >
                    <Minus />
                </button>

                <span className={styles.quantity}>{item.quantity}</span>

                <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={styles.quantityBtn}
                >
                    <Plus />
                </button>
            </div>

            <div className={styles.itemTotal}>
                {formatCurrency(item.price * item.quantity)}
            </div>

            <button onClick={handleRemove} className={styles.removeBtn}>
                <Trash2 />
            </button>
        </div>
    );
}