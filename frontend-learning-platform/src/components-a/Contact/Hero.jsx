
// components/contact/Hero.jsx
import React from 'react';
import Cta from '../../assets/About/Banner.png'; // Adjust the path as necessary
const Hero = () => {
  return (
    // <section className="p-4 md:p-50 m-5 md:m-15 bg-cover bg-center h-full flex items-center md:flex"
    // style={{
    //   backgroundImage: `url(${Cta})`,
    // }}>
    //   <div className="relative bg-blue-600 text-white py-16" >
    //   <div className="container mx-auto px-6 relative z-10">
    //     <h1 className="text-4xl font-bold">CONTACT US</h1>
    //   </div>
    //   <div className="absolute inset-0 bg-blue-800 bg-opacity-50 z-0"></div>
    // </div>
    // </section>
    <section
  className="p-8 md:p-20 m-5 md:m-15 bg-cover bg-center h-full flex items-center"
  style={{
    backgroundImage: `url(${Cta})`,
  }}
>
  <div className="container mx-auto flex justify-end ">
    <div className="text-white text-4xl md:text-6xl font-bold w-full md:w-1/2 p-12 text-right">
      Contact Us
    </div>
  </div>
</section>
  );
};

export default Hero;