// src/pages/PlaceOrder.jsx
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title'; // Assuming this component exists
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { motion } from 'framer-motion'; // <--- ADD THIS LINE FOR FRAMER-MOTION

const PlaceOrder = () => {
    // Destructure clearCart from ShopContext
    const { products, currency, cartItems, clearCart, delivery_fee } = useContext(ShopContext);
    const navigate = useNavigate();

    // Use delivery_fee from context if it's dynamic, otherwise keep fixed.
    // For consistency with ShopContext, let's use delivery_fee from context.
    const FIXED_SHIPPING_FEE = delivery_fee || 30.00; // Use context's delivery_fee or fallback

    const [orderSummary, setOrderSummary] = useState({
        items: [],
        subtotal: 0,
        shipping: FIXED_SHIPPING_FEE,
        total: 0,
    });

    const [customerDetails, setCustomerDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: 'card',
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const calculateOrderSummary = () => {
            const tempItems = [];
            let currentSubtotal = 0;

            for (const itemId in cartItems) {
                const productData = products.find((product) => product.id === Number(itemId));
                for (const size in cartItems[itemId]) {
                    const quantity = cartItems[itemId][size];
                    if (quantity > 0 && productData) {
                        tempItems.push({
                            id: productData.id,
                            name: productData.name,
                            image: productData.image && productData.image[0], // Ensure image[0] exists
                            size: size,
                            quantity: quantity,
                            price: productData.price,
                            itemTotal: productData.price * quantity,
                        });
                        currentSubtotal += productData.price * quantity;
                    }
                }
            }

            // Shipping is only applied if there are items
            const currentShipping = tempItems.length > 0 ? FIXED_SHIPPING_FEE : 0;
            const currentTotal = currentSubtotal + currentShipping;

            setOrderSummary({
                items: tempItems,
                subtotal: currentSubtotal,
                shipping: currentShipping,
                total: currentTotal,
            });

            // Redirect if cart is empty after calculation or on initial access
            if (tempItems.length === 0) {
                // Check if the cart was actually non-empty before or if we just landed here
                const cartHasData = Object.keys(cartItems).some(itemId =>
                    Object.values(cartItems[itemId]).some(qty => qty > 0)
                );

                if (cartHasData || window.location.pathname === '/placeorder') {
                    toast.error("Your cart is empty. Please add items before proceeding to checkout.");
                }
                navigate('/cart');
            }
        };

        // This effect runs on component mount and when dependencies change.
        // It's important that calculateOrderSummary does not directly cause
        // a state update in the ShopContextProvider during its render cycle.
        calculateOrderSummary();
    }, [cartItems, products, navigate, FIXED_SHIPPING_FEE]); // Added FIXED_SHIPPING_FEE to dependencies

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const validateForm = useCallback(() => {
        const newErrors = {};
        if (!customerDetails.firstName.trim()) newErrors.firstName = 'First Name is required.';
        if (!customerDetails.lastName.trim()) newErrors.lastName = 'Last Name is required.';
        if (!customerDetails.email.trim()) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) newErrors.email = 'Email is invalid.';
        if (!customerDetails.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required.';
        if (!customerDetails.city.trim()) newErrors.city = 'City is required.';
        if (!customerDetails.state.trim()) newErrors.state = 'State/Province is required.';
        if (!customerDetails.zipCode.trim()) newErrors.zipCode = 'Zip Code is required.';
        if (!customerDetails.country.trim()) newErrors.country = 'Country is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [customerDetails]);

    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        // Additional check just before processing
        if (orderSummary.items.length === 0) {
            toast.error("Your cart is empty. Please add items before placing an order.");
            navigate('/cart');
            return;
        }

        if (!validateForm()) {
            toast.error("Please fill in all required fields correctly.");
            return;
        }

        setIsProcessing(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log('Order Placed Successfully (Simulated)!');
            console.log('Order Details:', {
                orderSummary: orderSummary,
                customerDetails: customerDetails,
            });

            toast.success('Order Confirmed!', {
                icon: '✅',
            });

            // Clear the cart after successful order
            clearCart();

            // Redirect to a success page after a short delay for the user to see the notification
            setTimeout(() => {
                navigate('/order-success');
            }, 1000); // 1-second delay

        } catch (error) {
            console.error('Error placing order:', error);
            toast.error(error.message || 'Failed to place order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Render nothing or a loading spinner if redirecting due to empty cart
    if (orderSummary.items.length === 0 && Object.keys(cartItems).every(itemId => Object.values(cartItems[itemId]).every(qty => qty === 0))) {
        return <div className="text-center py-20 text-gray-600">Redirecting to cart...</div>;
    }

    return (
        <div className='container mx-auto px-4 py-8 pt-14'>
            <div className='text-2xl mb-6'>
                <Title text1={'Place Your'} text2={'Order'} />
            </div>

            <form onSubmit={handleSubmitOrder} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Delivery Information Section */}
                <motion.div // <--- This now works because 'motion' is imported
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className='lg:col-span-2 bg-white p-6 rounded-lg shadow-md'
                >
                    <h2 className='text-xl font-semibold mb-4 text-gray-800'>Delivery Information</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                        <div>
                            <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>First Name</label>
                            <input
                                type='text'
                                id='firstName'
                                name='firstName'
                                value={customerDetails.firstName}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                                required
                            />
                            {errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName}</p>}
                        </div>
                        <div>
                            <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>Last Name</label>
                            <input
                                type='text'
                                id='lastName'
                                name='lastName'
                                value={customerDetails.lastName}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                                required
                            />
                            {errors.lastName && <p className='text-red-500 text-xs mt-1'>{errors.lastName}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email Address</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={customerDetails.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                            required
                        />
                        {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='addressLine1' className='block text-sm font-medium text-gray-700'>Address Line 1</label>
                        <input
                            type='text'
                            id='addressLine1'
                            name='addressLine1'
                            value={customerDetails.addressLine1}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder='Street address, P.O. Box'
                            required
                        />
                        {errors.addressLine1 && <p className='text-red-500 text-xs mt-1'>{errors.addressLine1}</p>}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='addressLine2' className='block text-sm font-medium text-gray-700'>Address Line 2 (Optional)</label>
                        <input
                            type='text'
                            id='addressLine2'
                            name='addressLine2'
                            value={customerDetails.addressLine2}
                            onChange={handleChange}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Apartment, suite, unit, building, floor etc.'
                        />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>
                        <div>
                            <label htmlFor='city' className='block text-sm font-medium text-gray-700'>City</label>
                            <input
                                type='text'
                                id='city'
                                name='city'
                                value={customerDetails.city}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                                required
                            />
                            {errors.city && <p className='text-red-500 text-xs mt-1'>{errors.city}</p>}
                        </div>
                        <div>
                            <label htmlFor='state' className='block text-sm font-medium text-gray-700'>State/Province</label>
                            <input
                                type='text'
                                id='state'
                                name='state'
                                value={customerDetails.state}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                                required
                            />
                            {errors.state && <p className='text-red-500 text-xs mt-1'>{errors.state}</p>}
                        </div>
                        <div>
                            <label htmlFor='zipCode' className='block text-sm font-medium text-gray-700'>Zip Code</label>
                            <input
                                type='text'
                                id='zipCode'
                                name='zipCode'
                                value={customerDetails.zipCode}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                                required
                            />
                            {errors.zipCode && <p className='text-red-500 text-xs mt-1'>{errors.zipCode}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='country' className='block text-sm font-medium text-gray-700'>Country</label>
                        <input
                            type='text'
                            id='country'
                            name='country'
                            value={customerDetails.country}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                            required
                        />
                        {errors.country && <p className='text-red-500 text-xs mt-1'>{errors.country}</p>}
                    </div>

                    <h2 className='text-xl font-semibold mt-8 mb-4 text-gray-800'>Payment Method</h2>
                    <div className='flex flex-wrap items-center gap-4 mb-4'>
                        <label className='inline-flex items-center'>
                            <input
                                type='radio'
                                name='paymentMethod'
                                value='card'
                                checked={customerDetails.paymentMethod === 'card'}
                                onChange={handleChange}
                                className='form-radio text-blue-600 h-5 w-5'
                            />
                            <span className='ml-2 text-gray-700'>Credit/Debit Card</span>
                        </label>
                        <label className='inline-flex items-center'>
                            <input
                                type='radio'
                                name='paymentMethod'
                                value='cod'
                                checked={customerDetails.paymentMethod === 'cod'}
                                onChange={handleChange}
                                className='form-radio text-blue-600 h-5 w-5'
                            />
                            <span className='ml-2 text-gray-700'>Cash on Delivery (COD)</span>
                        </label>
                    </div>

                    {customerDetails.paymentMethod === 'card' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                            transition={{ duration: 0.3 }}
                            className='border border-gray-200 p-4 rounded-md bg-gray-50'
                        >
                            <p className='text-gray-600 text-sm mb-3'>
                                Card payment integration would go here (e.g., Stripe, PayPal fields).
                                For this example, we'll simulate it with dummy fields.
                            </p>
                            <div className='mb-3'>
                                <label htmlFor='cardNumber' className='block text-sm font-medium text-gray-700'>Card Number</label>
                                <input type='text' id='cardNumber' placeholder='**** **** **** ****' className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor='expiry' className='block text-sm font-medium text-gray-700'>Expiry Date</label>
                                    <input type='text' id='expiry' placeholder='MM/YY' className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' />
                                </div>
                                <div>
                                    <label htmlFor='cvv' className='block text-sm font-medium text-gray-700'>CVV</label>
                                    <input type='text' id='cvv' placeholder='123' className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Order Summary Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit'
                >
                    <h2 className='text-xl font-semibold mb-4 text-gray-800'>Order Summary</h2>
                    <div className='border-b pb-4 mb-4 max-h-60 overflow-y-auto custom-scrollbar'>
                        {orderSummary.items.length > 0 ? (
                            orderSummary.items.map((item) => (
                                <div key={`${item.id}-${item.size}`} className='flex items-center mb-3 last:mb-0'>
                                    <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded-md mr-4' />
                                    <div>
                                        <p className='font-medium text-gray-900 text-sm'>{item.name} ({item.size})</p>
                                        <p className='text-gray-600 text-xs'>{item.quantity} x {currency}{item.price.toFixed(2)}</p>
                                        <p className='font-semibold text-gray-800 text-sm'>{currency}{item.itemTotal.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm italic">No items in order summary.</p>
                        )}
                    </div>

                    <div className='space-y-2 mb-6'>
                        <div className='flex justify-between text-gray-700'>
                            <span>Subtotal:</span>
                            <span>{currency}{orderSummary.subtotal.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between text-gray-700'>
                            <span>Shipping:</span>
                            <span>{currency}{orderSummary.shipping.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between text-lg font-bold text-blue-700 border-t pt-2 mt-2'>
                            <span>Total:</span>
                            <span>{currency}{orderSummary.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        disabled={isProcessing || orderSummary.items.length === 0}
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            'Place Order'
                        )}
                    </button>
                </motion.div>
            </form>
        </div>
    );
};

export default PlaceOrder;