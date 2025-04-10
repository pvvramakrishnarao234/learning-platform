// components/about/TeamSection.jsx
import React from 'react';

const TeamSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">JOIN OUR TEAM</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We love what we do and we do it with passion. We value the experimentation of the message and smart incentives.
          </p>
          <div className="mt-8">
            <a href="#" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300">
              See Current Openings
            </a>
          </div>
        </div>
        
        <div className="relative mt-16">
          <div className="flex justify-center">
            <div className="relative">
              {/* Team members path connections */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M200,150 C300,50 500,350 600,250" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
              
              {/* Team members */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center relative z-10">
                    <img src="frontend-learning-platform/src/assets/About/Rectangle 593.png" alt="Team member 1" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center relative z-10">
                    <img src="frontend-learning-platform/src/assets/About/Rectangle 594.png" alt="Team member 2" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center relative z-10">
                    <img src="frontend-learning-platform/src/assets/About/Rectangle 595.png" alt="Team member 3" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center relative z-10">
                    <img src="frontend-learning-platform/src/assets/About/Rectangle 596.png" alt="Team member 4" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;         