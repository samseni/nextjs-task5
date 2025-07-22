import './globals.css'

export const metadata = {
    title: 'ShopCart - Your One-Stop Shopping Destination',
    description: 'Discover amazing products at great prices',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}