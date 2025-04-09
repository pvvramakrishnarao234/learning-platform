import React from 'react';
import heroimage from '../../assets/Homepage/herosection.png'; // Adjust the path as necessary

const HeroSection = () => {
  return (
    <section className=" min-h-screen bg-blue-900 text-white flex items-center justify-center    ">
      <div className="max-w-7xl  w-full flex flex-col md:flex-row items-center justify-between gap-10 pl-20">
        {/* Text Content */}
        <div className="text-center md:text-left space-y-4 w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Welcome To EduNexum - Learn, Teach, And Grow!</h1>
          <p className="text-lg mb-6">
            EduNexum connects students with expert tutors for personalized learning whether you want to learn or teach. We provide the
            best resources, interactive tools, and a seamless platform to turn your expertise into income.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Find a Tutor</button>
            <button className="bg-white text-blue-900 px-6 py-2 rounded hover:bg-gray-200">Become a Tutor</button>
          </div>
        </div>
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={heroimage} alt="Tutor" className="w-auto h-auto max-h-96 object-cover "/>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;