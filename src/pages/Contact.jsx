import React, { useState, useEffect } from 'react';
import assets from '../assets/assets';

const Title = ({ text1, text2 }) => {
  return (
    <h2 className="text-4xl font-bold text-gray-800 mb-2">
      {text1} <span className="text-violet-600">{text2}</span>
    </h2>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [animated, setAnimated] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formMessageType, setFormMessageType] = useState('info');

  useEffect(() => {
    setAnimated(true);
  }, []);

  useEffect(() => {
    if (formMessage) {
      const timer = setTimeout(() => {
        setFormMessage('');
        setFormMessageType('info');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [formMessage]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormMessage('Please fill in all fields.');
      setFormMessageType('error');
      return;
    }

    console.log('Contact form submitted:', formData);
    setFormMessage('Your message has been sent successfully!');
    setFormMessageType('success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 z-0
        ${animated ? 'animate-background-pulse-subtle' : ''}`}></div>

      {/* Centered Notification Message */}
      {formMessage && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4
          transition-all duration-300 ease-out ${formMessage ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className={`rounded-lg shadow-lg p-4 flex items-center justify-center space-x-3
            ${formMessageType === 'success' ? 'bg-green-500' : 
              formMessageType === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white font-medium`}
          >
            {formMessageType === 'success' && (
              <div className="flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            )}
            {formMessageType === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="text-center">{formMessage}</span>
          </div>
        </div>
      )}

      {/* Rest of your contact form content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page Title Section */}
        <div className={`text-center pt-8 border-t border-gray-200 transition-all duration-1000 ease-out-expo transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Title text1="Contact" text2="Us" />
          <p className="mt-4 text-xl text-gray-600">We'd love to hear from you!</p>
        </div>

        {/* Contact Section */}
        <section className={`my-16 flex flex-col md:flex-row items-center gap-16 bg-white p-8 rounded-xl shadow-2xl
          transition-all duration-1000 ease-out-expo transform ${animated ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-10'}`}
        >
          <img className="w-full md:max-w-[450px] rounded-xl shadow-lg" src={assets.contact_img} alt="Shopping Products" />

          <div className="flex flex-col justify-center gap-6 md:w-full text-gray-700">
            <h3 className="text-3xl font-bold text-gray-900">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields remain the same */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-base
                             transition-all duration-300 ease-in-out hover:border-violet-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-base
                             transition-all duration-300 ease-in-out hover:border-violet-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-base resize-y
                             transition-all duration-300 ease-in-out hover:border-violet-400"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white
                             bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500
                             transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className={`my-16 text-center
          transition-all duration-1000 ease-out-expo transform ${animated ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'}`}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Find Us Here</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-xl font-semibold text-violet-600 mb-2">Address</h4>
              <p className="text-gray-600">123 E-commerce Lane, Retail City, ST 98765</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-xl font-semibold text-violet-600 mb-2">Support</h4>
              <p className="text-gray-600">Email: support@chromacart.com</p>
              <p className="text-gray-600">Phone: (123) 456-7890</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;