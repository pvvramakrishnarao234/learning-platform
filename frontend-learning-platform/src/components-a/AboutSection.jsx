import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-blue-800 text-white py-16 px-6 text-center relative">
      <img src="/about-bg.jpg" alt="About Background" className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-4">ABOUT US</h1>
        <div className="flex justify-center space-x-4 mb-4">
          <span>30K Student Enrollment</span>
          <span>40K Classes</span>
          <span>58% Satisfaction Rate</span>
          <span>6.3+ Top Instructors</span>
        </div>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Student</h2>
          <h3 className="text-xl mb-2">ABOUT EDUNEXUM</h3>
          <p className="text-lg">
            Need expert guidance? EduNexum connects you with top educators across subjects. At EduNexum, we believe education should be
            accessible, engaging, and effective for all. Our platform connects students, tutors, and personalized education, providing
            interactive learning experiences and academic excellence.
          </p>
          <img src="/about-image.jpg" alt="Tutor" className="mt-6 mx-auto w-1/3 rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;