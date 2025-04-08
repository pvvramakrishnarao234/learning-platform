import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-blue-900 text-white py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome To EduNexum - Learn, Teach, And Grow!</h1>
      <p className="text-lg mb-6">
        EduNexum connects students with expert tutors for personalized learning whether you want to learn or teach. We provide the
        best resources, interactive tools, and a seamless platform to turn your expertise into income.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Find a Tutor</button>
        <button className="bg-white text-blue-900 px-6 py-2 rounded hover:bg-gray-200">Become a Tutor</button>
      </div>
      <img src="/hero-image.jpg" alt="Tutor" className="mt-6 mx-auto w-1/3" />
    </section>
  );
};

export default HeroSection;