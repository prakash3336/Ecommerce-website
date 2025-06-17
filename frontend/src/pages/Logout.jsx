import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process (in a real app, you would call your backend API)
    const timer = setTimeout(() => {
      // Clear user session/tokens from storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      
      // Redirect to home page after logout
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Logging Out</h2>
        
        <p className="text-gray-600 mb-6">
          You are being securely logged out. Please wait...
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Don't want to leave?</p>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 font-medium mt-2"
          >
            Return to previous page
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Logout;