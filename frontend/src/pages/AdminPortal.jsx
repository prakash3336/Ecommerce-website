import React, { useState, useEffect } from 'react';

// AdminPortal component for viewing orders, tracking, and reviews
const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('orders'); // State to manage active tab
  const [animated, setAnimated] = useState(false); // State for overall page load animation

  // Dummy data for demonstration purposes
  const [orders, setOrders] = useState([
    {
      id: 'ORD001', customerName: 'Alice Smith', total: 120.50, status: 'Pending',
      items: [{ name: 'Wireless Headphones', qty: 1 }, { name: 'USB-C Cable', qty: 2 }],
      orderDate: '2023-05-10', trackingId: 'TRACK123'
    },
    {
      id: 'ORD002', customerName: 'Bob Johnson', total: 55.00, status: 'Processing',
      items: [{ name: 'Gaming Mouse', qty: 1 }],
      orderDate: '2023-05-11', trackingId: 'TRACK124'
    },
    {
      id: 'ORD003', customerName: 'Charlie Brown', total: 299.99, status: 'Shipped',
      items: [{ name: 'Smartwatch', qty: 1 }, { name: 'Screen Protector', qty: 1 }],
      orderDate: '2023-05-12', trackingId: 'TRACK125'
    },
    {
      id: 'ORD004', customerName: 'Diana Prince', total: 85.20, status: 'Delivered',
      items: [{ name: 'Eco-Friendly Water Bottle', qty: 1 }],
      orderDate: '2023-05-13', trackingId: 'TRACK126'
    },
    {
      id: 'ORD005', customerName: 'Eve Adams', total: 75.00, status: 'Pending',
      items: [{ name: 'Bluetooth Speaker', qty: 1 }],
      orderDate: '2023-05-14', trackingId: 'TRACK127'
    },
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 'REV001', productName: 'Wireless Headphones', customerName: 'Alice Smith', rating: 5,
      comment: 'Excellent sound quality and comfortable fit!', reviewDate: '2023-05-15', approved: true
    },
    {
      id: 'REV002', productName: 'Gaming Mouse', customerName: 'Bob Johnson', rating: 4,
      comment: 'Responsive and ergonomic, great for gaming sessions.', reviewDate: '2023-05-16', approved: true
    },
    {
      id: 'REV003', productName: 'Smartwatch', customerName: 'Charlie Brown', rating: 3,
      comment: 'Battery life could be better, but features are good.', reviewDate: '2023-05-17', approved: false
    },
    {
      id: 'REV004', productName: 'Eco-Friendly Water Bottle', customerName: 'Diana Prince', rating: 5,
      comment: 'Stylish, durable, and keeps drinks cold for hours!', reviewDate: '2023-05-18', approved: true
    },
    {
      id: 'REV005', productName: 'Bluetooth Speaker', customerName: 'Eve Adams', rating: 2,
      comment: 'Sound is okay, but connection drops frequently.', reviewDate: '2023-05-19', approved: false
    },
  ]);

  // Simulate updating order status (for demonstration)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Simulate approving/deleting review (for demonstration)
  const toggleReviewApproval = (reviewId) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId ? { ...review, approved: !review.approved } : review
      )
    );
  };

  const deleteReview = (reviewId) => {
    setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
  };


  // Trigger page load animations
  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar Navigation */}
      <aside className={`w-64 bg-gray-800 text-white p-6 shadow-lg flex flex-col transition-all duration-700 ease-out transform
        ${animated ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} animate-sidebar-slide-in`}>
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-100">Admin Dashboard</h2>
        <nav className="space-y-4 flex-grow">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-300 transform hover:scale-105 active:scale-95
              ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-700 hover:text-blue-200'}`}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Customer Orders
            </span>
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-300 transform hover:scale-105 active:scale-95
              ${activeTab === 'tracking' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-700 hover:text-blue-200'}`}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375M12 12.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M12 12.75H3.375m3 0h1.5m-3 0H3.375m7.5-6H9.375m3-3h-2.25m-4.125-3.75h-.375m6 4.5H16.5m-4.5 9V12m0-3V7.5M9.375 9l.375-.375M9.375 15l.375.375M9.375 18.75L9 19.125m6-7.5l-.375.375M12 12.75H12m1.5-1.5H1.5M12 9.75H1.5M12 7.5H1.5m10.5-3L12 3m-3.75 3.75H3.75M12 12.75H12" />
              </svg>
              Order Tracking
            </span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-300 transform hover:scale-105 active:scale-95
              ${activeTab === 'reviews' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-700 hover:text-blue-200'}`}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.706 3 12.25c0 1.152.26 2.269.743 3.329l-1.5 4.375 4.375-1.5c1.06.483 2.177.743 3.329.743z" />
              </svg>
              Product Reviews
            </span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-grow p-8 transition-all duration-700 ease-out transform
        ${animated ? 'translate-x-0 opacity-100 animate-main-content-fade-in' : 'translate-x-full opacity-0'}`}>
        <div className="bg-white rounded-xl shadow-xl p-8">
          {activeTab === 'orders' && (
            <div className="animate-tab-content-fade-in">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Customer Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Customer</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Total</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Order Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order, index) => (
                      <tr key={order.id} className={`hover:bg-gray-50 animate-row-slide-in`} style={{animationDelay: `${index * 0.05 + 0.1}s`}}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full transform transition-transform duration-300 hover:scale-105
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.orderDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => alert(`Viewing details for ${order.id}`)}
                            className="text-blue-600 hover:text-blue-900 mr-4 transition-colors duration-200 hover:underline"
                          >
                            View
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Processing')}
                            className="text-orange-600 hover:text-orange-900 transition-colors duration-200 hover:underline"
                          >
                            Process
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="animate-tab-content-fade-in">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Order Tracking</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((order, index) => (
                  <div key={order.id} className={`border border-gray-200 rounded-xl p-6 shadow-sm bg-gray-50 animate-card-pop`} style={{animationDelay: `${index * 0.1 + 0.1}s`}}>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-semibold text-gray-800">Order ID: {order.id}</h4>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">Customer: {order.customerName}</p>
                    <p className="text-gray-600 mb-4">Tracking ID: <span className="font-mono text-blue-700 font-bold">{order.trackingId || 'N/A'}</span></p>

                    <div className="mb-4">
                      <p className="font-medium text-gray-800 mb-2">Items:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {order.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item.name} (x{item.qty})</li>
                        ))}
                      </ul>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-2 bg-gray-200 rounded-full mt-4 mb-2">
                      <div className={`absolute h-full rounded-full transition-all duration-700 ease-in-out
                        ${order.status === 'Pending' ? 'w-1/4 bg-gray-400' :
                          order.status === 'Processing' ? 'w-2/4 bg-yellow-500' :
                          order.status === 'Shipped' ? 'w-3/4 bg-blue-500' : 'w-full bg-green-500'}`}>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Order Placed</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>

                    <div className="mt-6 text-right">
                      <label htmlFor={`status-select-${order.id}`} className="sr-only">Update status for {order.id}</label>
                      <select
                        id={`status-select-${order.id}`}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="animate-tab-content-fade-in">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Product Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review, index) => (
                  <div key={review.id} className={`border border-gray-200 rounded-xl p-6 shadow-sm bg-white animate-card-pop`} style={{animationDelay: `${index * 0.1 + 0.1}s`}}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-lg font-semibold text-gray-800">{review.productName}</p>
                        <p className="text-sm text-gray-600">by {review.customerName} on {review.reviewDate}</p>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`h-5 w-5 transition-transform duration-300 ${i < review.rating ? 'fill-current transform scale-110' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-gray-700 text-sm">({review.rating}/5)</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-2 text-base">{review.comment}</p>
                    <div className="mt-4 flex justify-end items-center">
                        {review.approved ? (
                            <span className="text-green-600 text-sm font-medium mr-4">Approved</span>
                        ) : (
                            <span className="text-yellow-600 text-sm font-medium mr-4">Pending Approval</span>
                        )}
                      <button
                        onClick={() => toggleReviewApproval(review.id)}
                        className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 transform hover:scale-105 active:scale-95
                           ${review.approved ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                      >
                        {review.approved ? 'Unapprove' : 'Approve'}
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="ml-3 px-4 py-2 rounded-md bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors duration-200 transform hover:scale-105 active:scale-95"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Tailwind CSS Keyframes for animations */}
      <style>
        {`
        /* Sidebar slide in */
        @keyframes sidebar-slide-in {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-sidebar-slide-in {
          animation: sidebar-slide-in 0.7s ease-out forwards;
        }

        /* Main content fade in */
        @keyframes main-content-fade-in {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-main-content-fade-in {
          animation: main-content-fade-in 0.8s ease-out forwards;
          animation-delay: 0.2s; /* Delayed after sidebar */
        }

        /* Tab content fade in */
        @keyframes tab-content-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-tab-content-fade-in {
          animation: tab-content-fade-in 0.6s ease-out forwards;
        }

        /* Table row slide in with stagger */
        @keyframes row-slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-row-slide-in {
          animation: row-slide-in 0.5s ease-out forwards;
          opacity: 0; /* Hidden by default */
        }

        /* Card pop in with stagger */
        @keyframes card-pop {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          80% { opacity: 1; transform: scale(1.02) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-card-pop {
          animation: card-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0; /* Hidden by default */
        }

        /* Utility classes for delays (for sequential animations) */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        /* Add more as needed, e.g., .delay-400, .delay-500 */
        `}
      </style>
    </div>
  );
};

export default AdminPortal;
