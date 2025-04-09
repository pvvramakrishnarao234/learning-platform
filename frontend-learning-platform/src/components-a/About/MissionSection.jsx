// components/about/MissionSection.jsx
import React from 'react';

const MissionSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-8 mb-8 md:mb-0">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative pb-9/16">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="" alt="Students collaborating" className="w-full h-full object-cover" />
                    <button className="absolute flex items-center justify-center w-14 h-14 bg-green-500 rounded-full text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mb-4">Welcome To Education</div>
            <h2 className="text-3xl font-bold mb-6">OUR MISSION</h2>
            <p className="text-gray-600 mb-4">
              To revolutionize the way students learn by providing cutting-edge technology, 
              expert tutors, and a user-friendly platform that fosters knowledge and skill 
              development. To revolutionize the way students learn by providing cutting-edge 
              technology, expert tutors, and a user-friendly platform that fosters 
              knowledge and skill development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;