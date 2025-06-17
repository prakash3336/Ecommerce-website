// src/pages/OrderSuccess.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title'; // Assuming you have a Title component

const OrderSuccess = () => {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        // In a real application, you would receive the actual order ID
        // from your backend after the payment/order placement is confirmed.
        // For now, let's simulate a unique order ID.
        const generatedOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        setOrderId(generatedOrderId);

        // Optional: You might want to prevent going back to this page
        // using the browser's back button after leaving.
        // Or redirect to home after a certain time.
        // const timer = setTimeout(() => {
        //     navigate('/', { replace: true });
        // }, 10000); // Redirect to home after 10 seconds

        // return () => clearTimeout(timer); // Clean up the timer
    }, []);

    const handleContinueShopping = () => {
        navigate('/'); // Navigate back to the home page or products page
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 text-center bg-gray-50"
        >
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-xl w-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-24 h-24 text-green-500 mx-auto mb-6 animate-bounce"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <Title text1="Order" text2="Confirmed!" />
                <p className="text-xl text-gray-700 mt-4 mb-2">Thank you for your purchase!</p>
                {orderId && (
                    <p className="text-md text-gray-600 mb-6">
                        Your order ID is: <span className="font-bold text-blue-600">{orderId}</span>
                    </p>
                )}
                <p className="text-gray-600 mb-8">
                    You will receive an email confirmation shortly with details of your order.
                </p>

                <button
                    onClick={handleContinueShopping}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                    Continue Shopping
                </button>
            </div>
        </motion.div>
    );
};

export default OrderSuccess;