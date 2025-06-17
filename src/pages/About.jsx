import React, { useState, useEffect } from 'react';
import assets from '../assets/assets';
import { Link } from 'react-router-dom';
// Assuming Title component is available at '../components/Title'
// And assets is available at '../assets/assets'
// For this standalone code, we'll simulate them or provide simple placeholders.

// Placeholder for Title component if not imported externally
const Title = ({ text1, text2 }) => {
  return (
    <h2 className="text-4xl font-bold text-gray-800 mb-2">
      {text1} <span className="text-violet-600">{text2}</span>
    </h2>
  );
};

// Placeholder for assets if not imported externally
<img src={assets.about_img}/>


const About = () => {
  const [animated, setAnimated] = useState(false); // Declare animated state here

  useEffect(() => {
    // Trigger animations on component mount
    setAnimated(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Subtle Background Overlay Animation (from previous versions, reused) */}
      <div className={`absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 z-0
        ${animated ? 'animate-background-pulse-subtle' : ''}`}></div>

      {/* Page Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page Title Section */}
        <div className={`text-center pt-8 border-t border-gray-200 transition-all duration-1000 ease-out-expo transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Title text1="About" text2="Us" />
          <p className="mt-4 text-xl text-gray-600">Our Story, Our Vision, Your Experience.</p>
        </div>

        {/* Main Content & Image Section */}
        <section className={`my-16 flex flex-col md:flex-row items-center gap-16
          transition-all duration-1000 ease-out-expo transform ${animated ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-10'}`}
        >
          <img className="w-full md:max-w-[450px] rounded-xl shadow-2xl animate-image-reveal-fade" src={assets.about_img} alt="Chromacart Experience" />
          <div className="flex flex-col justify-center gap-6 md:w-full text-gray-700 animate-text-slide-fade delay-200">
            <h3 className="text-3xl font-bold text-gray-900">Your Shopping Journey, Reimagined.</h3>
            <p className="leading-relaxed">
              At Chromacart, we believe shopping should be more than just a transaction — it should be an experience. That’s why we’ve created a platform that brings together **style, quality, and convenience** under one roof. From trendy fashion and smart electronics to everyday essentials, our carefully selected products are designed to meet the needs of modern shoppers.
            </p>
            <p className="leading-relaxed">
              Our commitment goes beyond products; we aim to deliver **excellent service, fast shipping, and a customer-first approach** you can count on. Whether you’re exploring the latest arrivals or picking out trusted favorites, Chromacart is here to make your online shopping easier, more enjoyable, and full of value.
            </p>
            <p className="leading-relaxed font-semibold text-gray-800 mt-4">
              Our Mission: To make online shopping simple, reliable, and enjoyable, offering quality products, fast delivery, and great customer service — all in one trusted place.
            </p>
          </div>
        </section>

        {/* Why Choose Chromacart Section */}
        <section className={`my-16 max-w-6xl mx-auto text-center
          transition-all duration-1000 ease-out-expo transform ${animated ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'}`}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Chromacart?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Curated Selection - New Icon (Shopping Bag) */}
            <div className="bg-white p-6 rounded-xl shadow-md animate-feature-card-pop delay-100">
              <div className="text-violet-600 text-4xl mb-3 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Curated Selection</h4>
              <p className="text-gray-600 text-sm">Hand-picked products for quality and style, ensuring a delightful discovery.</p>
            </div>

            {/* Feature 2: Seamless Shopping - New Icon (Lightning Bolt) */}
            <div className="bg-white p-6 rounded-xl shadow-md animate-feature-card-pop delay-200">
              <div className="text-violet-600 text-4xl mb-3 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L13.5 21.75l1.094-7.5H3.75z" />
                  </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Effortless Shopping</h4>
              <p className="text-gray-600 text-sm">Enjoy an intuitive, smooth, and hassle-free online experience from start to finish.</p>
            </div>

            {/* Feature 3: Exceptional Service - New Icon (Chat Bubble) */}
            <div className="bg-white p-6 rounded-xl shadow-md animate-feature-card-pop delay-300">
              <div className="text-violet-600 text-4xl mb-3 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6.174 3.197.512 4.757l-.677 2.945a.75.75 0 00.935.935l2.945-.677c1.56.338 3.157.512 4.757.512h4.5c1.6 0 3.197-.174 4.757-.512l2.945.677a.75.75 0 00.935-.935l-.677-2.945c.338-1.56.512-3.157.512-4.757V12c0-2.856-1.125-5.59-3.13-7.6l-1.76-1.76a.75.75 0 00-1.06 0L12 5.47l-1.76-1.76a.75.75 0 00-1.06 0L5.13 5.166C3.125 7.17 2 9.904 2 12.76z" />
                  </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Exceptional Service</h4>
              <p className="text-gray-600 text-sm">Dedicated support, fast shipping, and a customer-first approach you can always rely on.</p>
            </div>
          </div>
        </section>

        {/* Call to Action / Explore */}
        <section className={`my-16 text-center
          transition-all duration-1000 ease-out-expo transform ${animated ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-2xl font-semibold text-gray-700 mb-6">Ready to discover your next favorite?</p>
       <Link to='/collection'><button
            className="px-8 py-4 bg-violet-600 text-white font-semibold text-lg rounded-full shadow-lg
                       hover:bg-violet-700 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-glow"
          >
            Explore Collections
          </button></Link>
           
        </section>
      </div>
    </div>
  );
};

export default About;
