import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure this import is added if you're using React Router

// Main App component for the login page
const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentMode, setCurrentMode] = useState('initial_email'); // 'initial_email', 'login', 'register'
  const [isAnimating, setIsAnimating] = useState(false); // State to trigger form transitions
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [existingCustomers, setExistingCustomers] = useState(['user@example.com', 'admin@store.com']);
  const navigate = useNavigate(); // Navigation hook

  // Effect for initial animation on component mount
  useEffect(() => {
    setIsAnimating(true); // Trigger fade-in for the main container
  }, []);

  // Effect for message display timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('info');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address.');
      setMessageType('error');
      return;
    }

    // Add a slight delay for animation before changing mode
    setIsAnimating(false); // Trigger fade-out
    setTimeout(() => {
      if (existingCustomers.includes(email.toLowerCase())) {
        setCurrentMode('login');
        setMessage('Welcome back! Please sign in.');
        setMessageType('info');
      } else {
        setCurrentMode('register');
        setMessage("Looks like you're new! Please create a password.");
        setMessageType('info');
      }
      setIsAnimating(true); // Trigger fade-in for the new form
    }, 300); // Duration of the fade-out transition
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentMode === 'login') {
      if (existingCustomers.includes(email.toLowerCase())) {
        setMessage('Login successful!');
        setMessageType('success');
        setTimeout(() => navigate('/'), 1000); // Navigate after success
      } else {
        setMessage('Login failed. Invalid credentials.');
        setMessageType('error');
      }
    } else if (currentMode === 'register') {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match!');
        setMessageType('error');
        return;
      }

      if (existingCustomers.includes(email.toLowerCase())) {
        setMessage('Account already exists! Please sign in.');
        setMessageType('info'); // Changed to info as it's not an error but a redirect
        setCurrentMode('login');
        setPassword('');
        setConfirmPassword('');
      } else {
        setExistingCustomers(prev => [...prev, email.toLowerCase()]);
        setMessage('Registered Successfully!');
        setMessageType('success');
        // After successful registration, transition to login mode
        setIsAnimating(false); // Trigger fade-out for register form
        setTimeout(() => {
          setCurrentMode('login');
          setPassword('');
          setConfirmPassword('');
          setIsAnimating(true); // Trigger fade-in for login form
        }, 300);
      }
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsAnimating(false); // Trigger fade-out
    setTimeout(() => {
      setCurrentMode('initial_email');
      setMessage('');
      setMessageType('info');
      setIsAnimating(true); // Trigger fade-in
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-800 via-violet-900 to-blue-900 relative overflow-hidden">
      {/* Background blobs - Added more dynamic animations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-48 h-48 bg-white opacity-5 rounded-full blur-xl top-1/4 left-[15%] animate-blob-float-one"></div>
        <div className="absolute w-64 h-64 bg-white opacity-5 rounded-full blur-xl bottom-1/3 right-[10%] animate-blob-float-two"></div>
        <div className="absolute w-56 h-56 bg-white opacity-5 rounded-full blur-xl top-1/2 left-[30%] animate-blob-float-three"></div>
        <div className="absolute w-72 h-72 bg-white opacity-5 rounded-full blur-xl bottom-1/4 left-[20%] animate-blob-float-four"></div>
      </div>

      {/* Centered popup message */}
      {message && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 transition-all duration-300 ease-in-out
          ${messageType === 'success' ? 'bg-green-500' : messageType === 'error' ? 'bg-red-500' : 'bg-blue-500'}
          ${message ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          <span className="text-white font-medium">{message}</span>
        </div>
      )}

      {/* Main form container with fade animation */}
      <div className={`bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md z-10 transition-all duration-500 ease-in-out transform
        ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {currentMode === 'initial_email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">Welcome</h2>
            <p className="text-gray-600 text-center">Enter your email to get started.</p>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 transition-all duration-200" />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-800 transition-all duration-200">Continue</button>
            <button type="button" onClick={resetForm} className="w-full text-sm text-gray-500 mt-2 hover:text-gray-700 transition-colors duration-200">
              Go back
            </button>
          </form>
        )}

        {(currentMode === 'login' || currentMode === 'register') && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">{currentMode === 'login' ? 'Sign In' : 'Create Account'}</h2>
            <p className="text-gray-600 text-center">{currentMode === 'login' ? 'Enter your password.' : 'Set your password to get started.'}</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} readOnly className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-md cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 transition-all duration-200" />
            </div>
            {currentMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 transition-all duration-200" />
              </div>
            )}
            <button type="submit" className="w-full py-2 px-4 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-800 transition-all duration-200">
              {currentMode === 'login' ? 'Sign In' : 'Register'}
            </button>
            <button type="button" onClick={resetForm} className="w-full text-sm text-gray-500 mt-2 hover:text-gray-700 transition-colors duration-200">
              Go back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;