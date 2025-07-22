'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import styles from './page.module.css';

// Mock products data - replace with your actual data
const mockProducts = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 299.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 1250
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Track your fitness goals with this advanced smartwatch",
        price: 199.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 890
    },
    {
        id: 3,
        name: "Organic Coffee Beans",
        description: "Premium organic coffee beans sourced from sustainable farms",
        price: 24.99,
        category: "Food",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 456
    },
    {
        id: 4,
        name: "Designer Backpack",
        description: "Stylish and functional backpack for everyday use",
        price: 89.99,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        rating: 4.2,
        reviews: 234
    },
    {
        id: 5,
        name: "Yoga Mat Premium",
        description: "Non-slip yoga mat for your fitness routine",
        price: 49.99,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 678
    },
    {
        id: 6,
        name: "Mountain Bike 29er",
        description: "High-performance mountain bike for trail adventures",
        price: 899.99,
        category: "Bikes",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7dff?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 892
    }
];

// Generate more products with varied categories - 100 items each
const productTemplates = {
    Electronics: [
        // Audio & Music (20 items)
        "Wireless Bluetooth Speaker", "Gaming Mechanical Keyboard", "Noise Canceling Earbuds",
        "Wireless Gaming Mouse", "USB-C Hub", "Smartphone Stand", "Portable Power Bank",
        "Laptop Cooling Pad", "HD Webcam", "Smart Home Assistant", "Wireless Charging Pad",
        "Gaming Headset", "Tablet Screen Protector", "Phone Case", "Bluetooth Headphones",
        "Portable Radio", "Car Phone Mount", "Wireless Earphones", "Desktop Speakers", "Soundbar",

        // Computing (20 items)
        "4K Ultra HD Monitor", "Mechanical Gaming Keyboard", "Optical Gaming Mouse", "USB Hub",
        "External Hard Drive", "SSD Drive", "RAM Memory", "Graphics Card", "Motherboard",
        "Processor CPU", "Computer Case", "Power Supply", "CPU Cooler", "Network Card",
        "WiFi Adapter", "Bluetooth Adapter", "USB Flash Drive", "Memory Card", "Card Reader", "Laptop Stand",

        // Mobile & Accessories (20 items)
        "Phone Screen Protector", "Wireless Charger", "Phone Battery Pack", "Car Charger",
        "Phone Camera Lens", "Phone Ring Holder", "Pop Socket", "Phone Wallet Case",
        "Waterproof Phone Case", "Phone Armband", "Selfie Stick", "Phone Tripod",
        "Lightning Cable", "USB-C Cable", "Micro USB Cable", "Cable Organizer",
        "Phone Cleaning Kit", "Tempered Glass", "Phone Grip", "Magnetic Car Mount",

        // Smart Home (20 items)
        "Smart Light Bulb", "Smart Plug", "Smart Switch", "Smart Doorbell",
        "Security Camera", "Smart Lock", "Motion Sensor", "Smart Thermostat",
        "Smart Speaker", "Voice Assistant", "Smart Display", "Smart Alarm",
        "Smart Smoke Detector", "Smart Water Sensor", "Smart Garage Opener", "Smart Curtains",
        "Smart Mirror", "Smart Scale", "Air Quality Monitor", "Smart Hub",

        // Gaming & Entertainment (19 items - reduced by 1)
        "Gaming Controller", "Gaming Chair", "Gaming Desk", "RGB LED Strips",
        "Gaming Mousepad", "VR Headset", "Gaming Capture Card", "Streaming Microphone",
        "Ring Light", "Green Screen", "Webcam Stand", "Monitor Arm",
        "Gaming Backpack", "Controller Stand", "Cable Management", "Desk Organizer",
        "Gaming Glasses", "Wrist Rest", "Monitor Light Bar"
    ],
    Fashion: [
        // Clothing - Tops (25 items)
        "Cotton Casual T-Shirt", "Polo Shirt", "Button Down Shirt", "Hoodie Sweatshirt",
        "Crew Neck Sweater", "V-Neck Sweater", "Tank Top", "Long Sleeve Shirt",
        "Flannel Shirt", "Graphic Tee", "Henley Shirt", "Muscle Tank", "Baseball Tee",
        "Cardigan", "Blazer", "Denim Jacket", "Leather Jacket", "Windbreaker",
        "Zip Hoodie", "Pullover", "Thermal Shirt", "Compression Shirt", "Workout Top",
        "Crop Top", "Tunic Top",

        // Clothing - Bottoms (25 items)
        "Denim Slim Fit Jeans", "Straight Leg Jeans", "Skinny Jeans", "Bootcut Jeans",
        "Cargo Pants", "Chino Pants", "Dress Pants", "Joggers", "Sweatpants",
        "Shorts", "Board Shorts", "Gym Shorts", "Denim Shorts", "Cargo Shorts",
        "Leggings", "Yoga Pants", "Track Pants", "Palazzo Pants", "Capri Pants",
        "Maxi Skirt", "Mini Skirt", "Pencil Skirt", "Pleated Skirt", "Denim Skirt", "A-Line Skirt",

        // Accessories (25 items)
        "Leather Crossbody Bag", "Canvas Messenger Bag", "Leather Belt", "Baseball Cap",
        "Sunglasses", "Wrist Watch", "Fashion Jewelry", "Leather Wallet", "Backpack",
        "Tote Bag", "Clutch Bag", "Shoulder Bag", "Fanny Pack", "Duffle Bag",
        "Scarf", "Beanie Hat", "Fedora Hat", "Bucket Hat", "Visor", "Headband",
        "Hair Clips", "Earrings", "Necklace", "Bracelet", "Ring",

        // Footwear (24 items - reduced by 1)
        "Sneakers Running Shoes", "Canvas Sneakers", "High Top Sneakers", "Slip-On Shoes",
        "Dress Shoes", "Loafers", "Oxford Shoes", "Boots", "Ankle Boots", "Hiking Boots",
        "Sandals", "Flip Flops", "Slides", "Clogs", "Ballet Flats", "High Heels",
        "Wedge Shoes", "Platform Shoes", "Boat Shoes", "Espadrilles", "Mules",
        "Running Shoes", "Cross Training Shoes", "Basketball Shoes"
    ],
    Food: [
        // Beverages (25 items)
        "Green Tea Bags", "Black Tea", "Herbal Tea Collection", "Coffee Beans", "Ground Coffee",
        "Instant Coffee", "Cold Brew Coffee", "Decaf Coffee", "Espresso Beans", "Tea Infuser",
        "Matcha Powder", "Chai Tea", "Earl Grey Tea", "Chamomile Tea", "Peppermint Tea",
        "Lemon Tea", "Ginger Tea", "White Tea", "Oolong Tea", "Rooibos Tea",
        "Hot Chocolate Mix", "Protein Powder", "Energy Drink", "Coconut Water", "Sparkling Water",

        // Snacks & Sweets (25 items)
        "Artisan Dark Chocolate", "Milk Chocolate Bar", "White Chocolate", "Chocolate Truffles",
        "Gummy Bears", "Hard Candy", "Lollipops", "Mints", "Chewing Gum", "Protein Bars",
        "Granola Bars", "Energy Bars", "Trail Mix", "Mixed Nuts", "Almonds", "Cashews",
        "Pistachios", "Walnuts", "Dried Fruits Mix", "Beef Jerky", "Crackers", "Pretzels",
        "Popcorn", "Rice Cakes", "Cookies",

        // Cooking Ingredients (25 items)
        "Olive Oil Extra Virgin", "Coconut Oil", "Avocado Oil", "Sesame Oil", "Balsamic Vinegar",
        "Apple Cider Vinegar", "Sea Salt", "Black Pepper", "Garlic Powder", "Onion Powder",
        "Paprika", "Cumin", "Oregano", "Basil", "Thyme", "Rosemary", "Cinnamon",
        "Vanilla Extract", "Honey", "Maple Syrup", "Brown Sugar", "White Sugar",
        "Baking Powder", "Baking Soda", "Corn Starch",

        // Pantry Staples (25 items)
        "Pasta Sauce", "Tomato Sauce", "Pesto Sauce", "Alfredo Sauce", "Soy Sauce",
        "Hot Sauce", "BBQ Sauce", "Ketchup", "Mustard", "Mayo", "Salad Dressing",
        "Quinoa Seeds", "Brown Rice", "White Rice", "Pasta", "Whole Wheat Pasta",
        "Oatmeal", "Cereal", "Bread", "Tortillas", "Pita Bread", "Bagels",
        "Peanut Butter", "Almond Butter", "Jam"
    ],
    Sports: [
        // Fitness Equipment (25 items)
        "Resistance Bands Set", "Foam Roller", "Exercise Ball", "Jump Rope", "Dumbbells Set",
        "Kettlebell", "Barbell", "Weight Plates", "Bench Press", "Pull Up Bar", "Push Up Bars",
        "Ab Wheel", "Medicine Ball", "Battle Ropes", "Suspension Trainer", "Yoga Mat",
        "Yoga Blocks", "Yoga Strap", "Pilates Ring", "Stretching Strap", "Massage Ball",
        "Grip Strengthener", "Wrist Weights", "Ankle Weights", "Workout Gloves",

        // Cardio Equipment (25 items)
        "Treadmill", "Exercise Bike", "Elliptical Machine", "Rowing Machine", "Stepper",
        "Jump Rope", "Agility Ladder", "Speed Rope", "Boxing Heavy Bag", "Punching Bag",
        "Speed Bag", "Boxing Gloves", "Hand Wraps", "Shin Guards", "Mouth Guard",
        "Skipping Rope", "Hula Hoop", "Balance Board", "BOSU Ball", "Plyometric Box",
        "Agility Cones", "Training Hurdles", "Parachute", "Weighted Vest", "Heart Rate Monitor",

        // Sports Accessories (25 items)
        "Water Bottle", "Gym Towel", "Protein Shaker", "Gym Bag", "Sports Backpack",
        "Running Belt", "Fitness Tracker", "Sports Watch", "Sweatbands", "Headband",
        "Wristbands", "Knee Pads", "Elbow Pads", "Compression Sleeves", "Athletic Tape",
        "First Aid Kit", "Ice Pack", "Hot Pack", "Muscle Rub", "Sports Sunglasses",
        "Cap", "Visor", "Athletic Socks", "Compression Socks", "Insoles",

        // Outdoor Sports (24 items - reduced by 1)
        "Swimming Goggles", "Swim Cap", "Kickboard", "Pool Noodle", "Snorkel Set",
        "Tennis Balls", "Tennis Racket", "Badminton Set", "Volleyball", "Basketball",
        "Soccer Ball", "Football", "Baseball", "Baseball Glove", "Batting Gloves",
        "Golf Balls", "Golf Tees", "Frisbee", "Camping Chair", "Hiking Boots",
        "Sports Gloves", "Running Shoes", "Cleats", "Athletic Shorts"
    ],
    Bikes: [
        // Mountain Bikes (25 items)
        "Mountain Bike 29er", "Hardtail Mountain Bike", "Full Suspension MTB", "Cross Country Bike",
        "Trail Mountain Bike", "Enduro Mountain Bike", "Downhill Mountain Bike", "Electric Mountain Bike",
        "Women's Mountain Bike", "Kids Mountain Bike", "Fat Tire Mountain Bike", "Carbon Mountain Bike",
        "Aluminum Mountain Bike", "Steel Mountain Bike", "Titanium Mountain Bike", "Foldable Mountain Bike",
        "Single Speed Mountain Bike", "Geared Mountain Bike", "Disc Brake Mountain Bike", "V-Brake Mountain Bike",
        "Suspension Fork MTB", "Rigid Fork MTB", "Plus Size Mountain Bike", "Compact Mountain Bike", "Professional MTB",

        // Road Bikes (25 items)
        "Road Racing Bike", "Endurance Road Bike", "Aero Road Bike", "Climbing Road Bike",
        "Carbon Road Bike", "Aluminum Road Bike", "Steel Road Bike", "Titanium Road Bike",
        "Electric Road Bike", "Women's Road Bike", "Entry Level Road Bike", "Professional Road Bike",
        "Time Trial Bike", "Triathlon Bike", "Gravel Road Bike", "Cyclocross Bike",
        "Vintage Road Bike", "Fixed Gear Road Bike", "Single Speed Road Bike", "Geared Road Bike",
        "Drop Bar Road Bike", "Flat Bar Road Bike", "Compact Road Bike", "Touring Road Bike", "Commuter Road Bike",

        // Hybrid & City Bikes (25 items)
        "Hybrid Bike", "City Commuter Bike", "Urban Bike", "Comfort Bike", "Cruiser Bike",
        "Dutch Style Bike", "Step Through Bike", "Electric City Bike", "Folding City Bike",
        "Commuter Electric Bike", "Cargo Bike", "Family Bike", "Tandem Bike", "Recumbent Bike",
        "Beach Cruiser", "Vintage City Bike", "Retro Style Bike", "Ladies City Bike", "Mens City Bike",
        "Student Bike", "Campus Bike", "Basket Bike", "Shopping Bike", "Leisure Bike", "Comfort Cruiser",

        // Bike Accessories & Parts (25 items)
        "Bike Helmet", "Bike Lock", "Bike Light Set", "Bike Computer", "Water Bottle Holder",
        "Bike Pump", "Tire Repair Kit", "Bike Chain", "Bike Pedals", "Bike Seat",
        "Bike Handlebars", "Bike Grips", "Bike Bell", "Bike Mirror", "Bike Basket",
        "Bike Rack", "Bike Bag", "Bike Gloves", "Bike Shoes", "Bike Shorts",
        "Bike Jersey", "Bike Tools", "Bike Stand", "Bike Cover", "Bike Trainer"
    ],
    Home: [
        // Kitchen & Dining (25 items)
        "Ceramic Coffee Mug", "Travel Mug", "Water Bottle", "Wine Glasses", "Beer Mugs",
        "Kitchen Cutting Board", "Knife Set", "Kitchen Scale", "Mixing Bowls", "Measuring Cups",
        "Can Opener", "Bottle Opener", "Corkscrew", "Kitchen Timer", "Oven Mitts",
        "Pot Holders", "Dish Towels", "Placemats", "Coasters Set", "Napkin Holder",
        "Salt and Pepper Shakers", "Spice Rack", "Food Storage Containers", "Lunch Box", "Thermos",

        // Living Room (25 items)
        "Throw Pillow", "Throw Blanket", "Picture Frame", "Wall Art Print", "Table Lamp",
        "Floor Lamp", "Desk Lamp", "Reading Light", "String Lights", "Fairy Lights",
        "Curtain Panels", "Blinds", "Room Divider", "Ottoman", "Coffee Table Books",
        "Decorative Vase", "Artificial Plants", "Real Plants", "Plant Pot", "Watering Can",
        "Candle Holders", "Bookends", "Clock", "Mirror", "Wall Shelves",

        // Bedroom (25 items)
        "Bed Sheets", "Pillow Cases", "Comforter", "Duvet Cover", "Mattress Pad",
        "Memory Foam Pillow", "Down Pillow", "Neck Pillow", "Eye Mask", "Ear Plugs",
        "Night Light", "Alarm Clock", "Jewelry Box", "Clothes Hangers", "Shoe Rack",
        "Under Bed Storage", "Dresser Organizer", "Closet Organizer", "Hamper", "Laundry Bag",
        "Aromatherapy Diffuser", "Essential Oils", "Room Spray", "Humidifier", "Air Purifier",

        // Bathroom & Organization (25 items)
        "Bath Towel", "Hand Towel", "Wash Cloths", "Shower Curtain", "Bath Mat",
        "Toilet Paper Holder", "Towel Rack", "Soap Dispenser", "Toothbrush Holder", "Medicine Cabinet",
        "Storage Basket", "Closet Organizer", "Drawer Organizer", "Desk Organizer", "File Organizer",
        "Label Maker", "Storage Boxes", "Vacuum Bags", "Cleaning Supplies", "Trash Can",
        "Recycling Bin", "Step Stool", "Extension Cord", "Power Strip", "Batteries"
    ]
};

let productId = 7;
Object.keys(productTemplates).forEach(category => {
    productTemplates[category].forEach(productName => {
        mockProducts.push({
            id: productId++,
            name: productName,
            description: `Premium ${productName.toLowerCase()} with excellent quality, durability and modern design. Perfect for everyday use.`,
            price: Math.floor(Math.random() * 400) + 15,
            category: category,
            image: `https://picsum.photos/400/300?random=${productId}`,
            rating: 3.8 + Math.random() * 1.2,
            reviews: Math.floor(Math.random() * 2500) + 100
        });
    });
});

export default function HomePage() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams?.get('search') || '';
    const [products] = useState(mockProducts); // Using mock data
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(18); // Fixed at 18 products per page
    const [loading, setLoading] = useState(true);

    // Get unique categories with accurate counts - explicitly filter out Beauty
    const categories = [
        { name: 'All', count: products.length },
        ...Array.from(new Set(products.map(p => p.category)))
            .filter(category => category !== 'Beauty') // Explicitly remove Beauty category
            .map(category => ({
                name: category,
                count: products.filter(p => p.category === category).length
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
    ];

    // Simulate loading time
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Filter and sort products
    useEffect(() => {
        if (loading) return;

        let filtered = [...products];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply category filter - also filter out Beauty products
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Remove any Beauty products that might exist
        filtered = filtered.filter(product => product.category !== 'Beauty');

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'popularity':
                    return b.reviews - a.reviews;
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [products, searchQuery, selectedCategory, sortBy, loading]);

    // Pagination calculations
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (start > 2) pages.push('...');

            for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== totalPages) pages.push(i);
            }

            if (end < totalPages - 1) pages.push('...');
            if (totalPages > 1) pages.push(totalPages);
        }

        return pages;
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}>
                    <div className={styles.loaderSpinner}></div>
                    <p>Loading amazing products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.homepage}>
            <Navbar />

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.heroText}>
                            <h1 className={styles.heroTitle}>
                                Discover Amazing Products
                                <span className={styles.heroAccent}>Just For You</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                From tech gadgets to home essentials - find everything you need in one place
                            </p>
                        </div>

                        <div className={styles.heroSearch}>
                            <div className={styles.searchWrapper}>
                                <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="What are you looking for today?"
                                    className={styles.searchInput}
                                />
                                <button className={styles.searchButton}>
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className={styles.heroStats}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>{products.length}+</span>
                                <span className={styles.statLabel}>Products</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>5</span>
                                <span className={styles.statLabel}>Categories</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>24/7</span>
                                <span className={styles.statLabel}>Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className={styles.mainContent}>
                <div className="container">
                    {searchQuery && (
                        <div className={styles.searchResults}>
                            <h2>Search results for "{searchQuery}" ({filteredProducts.length} products)</h2>
                        </div>
                    )}

                    {/* Category Filter */}
                    <div className={styles.categorySection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Shop by Category</h2>
                            <p className={styles.sectionSubtitle}>Explore our curated collection</p>
                        </div>

                        <div className={styles.categoryGrid}>
                            {categories.map(category => (
                                <div
                                    key={category.name}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`${styles.categoryCard} ${
                                        selectedCategory === category.name ? styles.active : ''
                                    }`}
                                >
                                    <div className={styles.categoryIcon}>
                                        {category.name === 'All' && '🛍️'}
                                        {category.name === 'Electronics' && '📱'}
                                        {category.name === 'Fashion' && '👕'}
                                        {category.name === 'Food' && '🍎'}
                                        {category.name === 'Sports' && '⚽'}
                                        {category.name === 'Bikes' && '🚴'}
                                        {category.name === 'Home' && '🏠'}
                                    </div>
                                    <div className={styles.categoryInfo}>
                                        <h3 className={styles.categoryName}>{category.name}</h3>
                                        <span className={styles.categoryCount}>{category.count} items</span>
                                    </div>
                                    <div className={styles.categoryArrow}>→</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.productsSection}>
                        <div className={styles.productsHeader}>
                            <div className={styles.resultsInfo}>
                                <h3 className={styles.resultsTitle}>
                                    {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                                </h3>
                                <p className={styles.productCount}>
                                    {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                                </p>
                            </div>

                            <div className={styles.controls}>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className={styles.sortSelect}
                                >
                                    <option value="name">Sort by Name</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="popularity">Most Popular</option>
                                </select>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <>
                                <div className={styles.productsGrid}>
                                    {currentProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className={styles.pagination}>
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={styles.paginationBtn}
                                        >
                                            Previous
                                        </button>

                                        <div className={styles.pageNumbers}>
                                            {getPageNumbers().map((page, index) => (
                                                page === '...' ? (
                                                    <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
                                                ) : (
                                                    <button
                                                        key={page}
                                                        onClick={() => paginate(page)}
                                                        className={`${styles.pageNumber} ${
                                                            currentPage === page ? styles.active : ''
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                )
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={styles.paginationBtn}
                                        >
                                            Next
                                        </button>

                                        <div className={styles.pageInfo}>
                                            Page {currentPage} of {totalPages}
                                        </div>
                                    </div>
                                )}

                            </>
                        ) : (
                            <div className={styles.noProducts}>
                                <div className={styles.noProductsIcon}>🔍</div>
                                <h3>No products found</h3>
                                <p>Try adjusting your search or filter criteria</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                    }}
                                    className={styles.resetButton}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}