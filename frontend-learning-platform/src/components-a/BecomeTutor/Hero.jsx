import React from 'react';
import Button from './Button';


const HeroSection = () => {
  return (
    <div className="bg-blue-600 text-white py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              Make A Living By Teaching The Largest Community Of Learners Worldwide
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center md:items-start">
                <div className="bg-white p-2 rounded mb-3 ">
                  <img src="./src/assets/BecomeTutor/Signup.png" alt="Sign Up" className="w-6 h-6 " />
                </div>
                <h3 className="font-semibold text-lg mb-1">Sign Up</h3>
                <p className="text-sm text-center md:text-left">To Showcase Your Skills Profile</p>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <div className="bg-white p-2 rounded mb-3">
                  <img src="./src/assets/BecomeTutor/Approved.png" alt="Get Approved" className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Get Approved</h3>
                <p className="text-sm text-center md:text-left">By Our Team In EduNexum Only</p>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <div className="bg-white p-2 rounded mb-3">
                  <img src="./src/assets/BecomeTutor/grow.png" alt="Start Earning" className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Start Earning</h3>
                <p className="text-sm text-center md:text-left">By Teaching Students All Over The World</p>
              </div>
            </div>
            
            
          </div>
          
          <div className="md:w-2/5 relative">
            <div className="relative">
              <img src="./src/assets/Homepage/herosection.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-50"></div>
      <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-blue-400 rounded-full opacity-50"></div>
      <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-blue-400 rounded-full opacity-30"></div>
    </div>
  );
};

export default HeroSection;