import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

// Notification component (could be in a separate file, but for this example, it's here)
const Notification = ({ message, type, onClose }) => {
const notificationVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            damping: 10,
            stiffness: 100,
        },
    },
    exit: { opacity: 0, y: -50, scale: 0.8, transition: { duration: 0.3 } },
};

const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
const borderColor = type === 'success' ? 'border-green-700' : 'border-red-700';

return (
    <motion.div
        className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold flex items-center gap-3 ${bgColor} border-b-4 ${borderColor} z-50`}
        variants={notificationVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        {type === 'success' && (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )}
        {type === 'error' && (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14L21 3m0 0l-7.5 7.5M21 3L3 21" />
            </svg>
        )}
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white hover:text-gray-100 font-bold">
            &times;
        </button>
    </motion.div>
);
};

const Cart = () => {
const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
const [cartData, setCartData] = useState([]);
const [cartTotal, setCartTotal] = useState(0);
const [shippingFee, setShippingFee] = useState(0);
const [notification, setNotification] = useState(null); // New state for notifications

const navigate = useNavigate();

const FIXED_SHIPPING_FEE = 30.00;

useEffect(() => {
    const tempData = [];
    let subtotalAmount = 0;

    for (const itemId in cartItems) {
        const productData = products.find((product) => product.id === Number(itemId));
        for (const size in cartItems[itemId]) {
            if (cartItems[itemId][size] > 0) {
                const quantity = cartItems[itemId][size];
                tempData.push({
                    id: Number(itemId),
                    size: size,
                    quantity: quantity,
                });
                if (productData) {
                    subtotalAmount += productData.price * quantity;
                }
            }
        }
    }

    setCartData(tempData);

    const currentShippingFee = tempData.length > 0 ? FIXED_SHIPPING_FEE : 0;
    setShippingFee(currentShippingFee);
    setCartTotal(subtotalAmount + currentShippingFee);

}, [cartItems, products]);

// Function to show notification
const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    // Auto-hide after 3 seconds
    setTimeout(() => {
        setNotification(null);
    }, 3000);
};

const handleDeleteItem = (itemId, size, productName) => {
    updateQuantity(itemId, size, 0); // This should remove the item
    showNotification(`${productName} removed from cart!`, 'success');
};

const handleDiscoverClick = () => {
    console.log("Clicked 'Start Shopping Now!' - Navigating to /collection");
    navigate('/collection');
};

const handleCheckoutClick = () => {
    console.log("Clicked 'Proceed to Checkout' - Navigating to /placeorder");
    navigate('/placeorder');
};

// --- Animation Variants ---
const popUpVariants = {
    hidden: { opacity: 0, scale: 0.7, y: -50, rotate: -15 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 150,
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        y: 50,
        rotate: 15,
        transition: { duration: 0.4, ease: "easeIn" },
    },
};

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 10, stiffness: 100 } },
};

const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -90 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", damping: 10, stiffness: 100 } },
};

return (
    <div className='border-t pt-14'>
        {/* Notification */}
        <AnimatePresence>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </AnimatePresence>

        <div className='text-2xl mb-3'>
            <Title text1={'Your'} text2={'Cart'} />
        </div>

        <AnimatePresence mode='wait'>
            {cartData.length === 0 ? (
                <motion.div
                    key="empty-cart-trolley-content"
                    variants={popUpVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className='flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-xl text-gray-900 p-8 text-center relative overflow-hidden'
                >
                    {/* --- Decorative Corner Shapes (Animated) --- */}
                    <motion.div
                        initial={{ x: -50, y: -50, opacity: 0, rotate: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1, rotate: 45 }}
                        transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 80 }}
                        className='absolute top-0 left-0 w-24 h-24 bg-blue-300 rounded-full opacity-60 mix-blend-multiply filter blur-sm'
                    ></motion.div>
                    <motion.div
                        initial={{ x: 50, y: 50, opacity: 0, rotate: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1, rotate: -45 }}
                        transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 80 }}
                        className='absolute bottom-0 right-0 w-32 h-32 bg-purple-300 rounded-full opacity-60 mix-blend-multiply filter blur-sm'
                    ></motion.div>

                    {/* --- Shopping Trolley Icon --- */}
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-28 h-28 mb-4 text-blue-600 drop-shadow-md"
                        variants={iconVariants}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                    </motion.svg>

                    {/* --- Refreshed Engaging Messages --- */}
                    <motion.p
                        className='text-4xl font-extrabold mb-3 text-blue-700'
                        variants={textVariants}
                    >
                        Your Cart is Eager to be Filled!
                    </motion.p>
                    <motion.p
                        className='text-lg text-gray-700 mb-8 max-w-lg px-6'
                        variants={textVariants}
                    >
                        It looks like your shopping cart is empty.
                        Discover amazing products and add your first item today!
                    </motion.p>

                    {/* --- Updated Call to Action Button --- */}
                    <motion.button
                        className='px-12 py-5 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 text-lg'
                        variants={textVariants}
                        onClick={handleDiscoverClick}
                    >
                        Start Shopping Now!
                    </motion.button>
                </motion.div>
            ) : (
                <motion.div
                    key="cart-items"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* --- Existing Cart Items Display --- */}
                    {cartData.map((item, index) => {
                        const productData = products.find((product) => product.id === item.id);
                        if (!productData) return null;

                        return (
                            <div
                                key={index}
                                className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
                            >
                                <div className='flex items-start gap-6'>
                                    <img className='w-16 sm:w-20' src={productData.image[0]} alt='' />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                        <p className='text-sm text-gray-500'>Size: {item.size}</p>
                                        <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                                        <p className='text-sm font-medium mt-1'>
                                            Item Total: {currency}
                                            {(productData.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                {/* Changed onClick to call handleDeleteItem */}
                                <img
                                    onClick={() => handleDeleteItem(item.id, item.size, productData.name)}
                                    className='w-4 mr-4 sm:w-5 cursor-pointer'
                                    src={assets.bin_icon}
                                    alt='Delete Item'
                                />
                            </div>
                        );
                    })}

                    {/* --- Section for Cart Total --- */}
                    <div className='mt-8 pt-4 border-t-2 border-gray-300'>
                        {/* Subtotal display */}
                        <div className='flex justify-between items-center text-lg text-gray-800 mb-2'>
                            <span>Subtotal:</span>
                            <span>
                                {currency}
                                {(cartTotal - shippingFee).toFixed(2)}
                            </span>
                        </div>

                        {/* Shipping Fee display */}
                        <div className='flex justify-between items-center text-lg text-gray-800 mb-4'>
                            <span>Shipping Fee:</span>
                            <span>
                                {currency}
                                {shippingFee.toFixed(2)}
                            </span>
                        </div>

                        {/* Grand Total display */}
                        <div className='flex justify-between items-center text-2xl font-extrabold text-blue-700'>
                            <span>Order Total:</span>
                            <span>
                                {currency}
                                {cartTotal.toFixed(2)}
                            </span>
                        </div>
                        <button
                            className='mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300'
                            onClick={handleCheckoutClick}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);
};

export default Cart;