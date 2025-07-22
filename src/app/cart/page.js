'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/cartStore';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utils/currency';
import styles from './page.module.css';

export default function CartPage() {
    const router = useRouter();
    const items = useCartStore((state) => state.items);
    const getTotalPrice = useCartStore((state) => state.getTotalPrice);
    const clearCart = useCartStore((state) => state.clearCart);

    const subtotal = getTotalPrice();
    const shipping = subtotal > 0 ? 99 : 0; // ₹99 flat shipping
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;

    if (items.length === 0) {
        return (
            <div className={styles.cartPage}>
                <div className="container">
                    <div className={styles.emptyCart}>
                        <ShoppingBag className={styles.emptyCartIcon} />
                        <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
                        <p className={styles.emptyCartText}>Add some products to your cart to see them here</p>
                        <Link href="/" className={styles.continueShoppingBtn}>
                            <ArrowLeft />
                            <span>Continue Shopping</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cartPage}>
            <div className="container">
                <h1 className={styles.pageTitle}>Shopping Cart ({items.length} items)</h1>

                <div className={styles.cartContent}>
                    <div className={styles.cartItems}>
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    <div className={styles.orderSummary}>
                        <h2 className={styles.summaryTitle}>Order Summary</h2>

                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Subtotal</span>
                            <span className={styles.summaryValue}>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Delivery Charges</span>
                            <span className={styles.summaryValue}>
                {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
              </span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>GST (18%)</span>
                            <span className={styles.summaryValue}>{formatCurrency(tax)}</span>
                        </div>

                        {subtotal > 500 && (
                            <div className={styles.savingsRow}>
                                <span className={styles.savingsLabel}>You saved</span>
                                <span className={styles.savingsValue}>{formatCurrency(subtotal * 0.1)}</span>
                            </div>
                        )}

                        <hr className={styles.summaryDivider} />

                        <div className={styles.totalRow}>
                            <span>Total Amount</span>
                            <span className={styles.totalValue}>{formatCurrency(total)}</span>
                        </div>

                        <button
                            onClick={() => router.push('/checkout')}
                            className={styles.checkoutBtn}
                        >
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={clearCart}
                            className={styles.clearCartBtn}
                        >
                            Clear Cart
                        </button>

                        <div className={styles.promoCode}>
                            <input
                                type="text"
                                placeholder="Enter promo code"
                                className={styles.promoInput}
                            />
                            <button className={styles.promoBtn}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}