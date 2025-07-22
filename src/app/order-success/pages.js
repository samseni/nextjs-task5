'use client';

import Link from 'next/link';
import { CheckCircle, Package } from 'lucide-react';

export default function OrderSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Thank you for your purchase. We've sent you an email confirmation with your order details.
            </p>

            <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto mb-8">
                <Package className="w-12 h-12 mx-auto text-orange-500 mb-2" />
                <p className="text-sm text-gray-600">Estimated delivery</p>
                <p className="text-lg font-semibold">3-5 business days</p>
            </div>

            <Link
                href="/"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
                Continue Shopping
            </Link>
        </div>
    );
}