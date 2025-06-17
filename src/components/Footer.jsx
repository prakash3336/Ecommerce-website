import React from 'react'
import assets from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
         <div>
              <img src={assets.chroma} className='mb-5 w-32' alt=''/>
              <p className='w-full md:w-2/3 text-gray-600'>
               At Trendify, we’re passionate about delivering quality fashion that blends comfort, style, and affordability. From everyday essentials to occasion-ready outfits, our collections are thoughtfully curated to meet the needs of modern shoppers. Stay ahead with the latest trends, Your style journey starts here.
              </p>
         </div>
         <div>
             <p className='text-xl font-medium mb-5'>Company</p>
             <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
             </ul>
         </div>
         <div>
              <p className='text-xl font-medium mb-5'>Get in touch</p>
                 <ul className='flex flex-col gap-1 text-gray-600'>
                   <li>+1-212-456-7890</li>
                   <li>contact@Chromacart.com</li>
                 </ul>
         </div>
        </div>
        <div>
             <hr />
             <p className='py-5 text-sm text-center'>Copyright 2025@Chromacart.com - All Right Reserved.</p>
        </div>
              
    </div>
  )
}

export default Footer
