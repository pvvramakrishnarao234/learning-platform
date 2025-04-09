// components/about/AboutSection.jsx
import React from 'react';
import about from '../../assets/About/about.png'; // Adjust the path as necessary
const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-8">
            <div className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mb-4">Student</div>
            <h2 className="text-3xl font-bold mb-6">ABOUT<br />EDUNEXUM</h2>
            <p className="text-gray-700 mb-4">Need expert guidance? Edunexum connects you with top educators across.</p>
            <p className="text-gray-600 mb-4">
              At Edunexum, we believe education should be accessible, engaging, 
              and effective for everyone. Our platform connects students, tutors, 
              and administrators in a seamless digital learning environment, 
              ensuring personalized education, interactive learning experiences, 
              and academic excellence.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-end items-center mt-8 md:mt-0">
  <img src={about} alt="About Section" className="rounded-lg w-full h-auto" />
</div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;