import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='w-full bg-[#e0e0e0] dark:bg-[#121212] text-gray-300 fixed bottom-0'>
      <div className='max-w-[1240px] mx-auto py-6 px-8 grid lg:grid-cols-3 gap-8'>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>BlockPulse</h1>
        <p className='text-black dark:text-white'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <div className='flex space-x-6'>
          <FaFacebook size={30} className="hover:text-[#1877f2]" />
          <FaInstagram size={30} className="hover:text-[#E4405F]" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
