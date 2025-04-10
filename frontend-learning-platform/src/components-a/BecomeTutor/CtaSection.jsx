// components/CtaSection.jsx
import React from 'react';
import Button from './Button';
import tutorimage from '../../assets/About/Get into touch.png'; // Assuming you have an image in the assets folder
const CtaSection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                GET PAID TO TEACH ONLINE
              </h2>
              <p className="text-gray-600 mb-6">
                Connect with students around the world and teach from your living room
              </p>
              <Button label="Create a tutor profile" primary={true} />
            </div>
            <div className="md:w-1/2">
              <img src={tutorimage} alt="Teacher" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;