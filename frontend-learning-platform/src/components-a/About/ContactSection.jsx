// components/about/ContactSection.jsx
import React from 'react';

const ContactSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-6 text-center md:text-left">GET IN TOUCH</h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">
              Interested to Explore More? Get in Touch with Our Experts and 
              Transpose a complete Digital Marketing Strategy for You.
            </p>
            <div className="flex justify-center md:justify-start">
              <a href="#" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300">
                Contact Us
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="" alt="Contact" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;