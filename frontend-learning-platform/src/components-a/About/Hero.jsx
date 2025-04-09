import React from 'react';

const Hero = () => {
  return (
    <div
      className="relative bg-blue-600 text-white py-16 bg-cover bg-center"
      style={{ backgroundImage: `url('../../assets/About/Banner.png')` }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl font-bold mb-8">ABOUT US</h1>
      </div>
      <div className="absolute inset-0 bg-blue-800 bg-opacity-50 z-0"></div>
    </div>
  );
};

export default Hero;