import React from 'react';
import tutorimage from '../../assets/About/About.png'
const Hero = () => {
  return (
    <div className="relative bg-blue-600 py-16">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-white z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Online English Tutors &<br />
            <span className="text-orange-400 font-bold">Teachers For Private Lessons.</span>
          </h1>
          <p className="mb-6 mt-4 text-sm md:text-base">
            Struggling With A Subject? Need Expert Guidance? EduNexum<br />
            Connects You With Top-Rated Tutors In Academics, Technology,<br />
            Finance, Life Skills, And More!
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-400 rounded-full mr-2"></div>
              <p className="text-sm">Affordable Personalized Learning</p>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-400 rounded-full mr-2"></div>
              <p className="text-sm">Verified & Experienced Tutors</p>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-400 rounded-full mr-2"></div>
              <p className="text-sm">Learn Anytime, Anywhere At Your Own Pace</p>
            </div>
          </div>
          
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md mt-6 hover:bg-orange-600 transition duration-300">
            Get Started
          </button>
        </div>
        
        <div className="lg:w-1/2 relative mt-8 lg:mt-0">
          <img 
            src={tutorimage} 
            alt="English Tutor"
            className="relative z-10 w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;