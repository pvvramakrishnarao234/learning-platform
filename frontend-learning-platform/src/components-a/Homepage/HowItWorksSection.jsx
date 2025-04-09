// HowItWorksSection.js
import React from 'react';
import arrow from '../../assets/Homepage/arrow.png';
const HowItWorksSection = () => {
  const steps = [
    { 
      title: 'Sign Up', 
      desc: 'Create a free student or tutor account. We’ll connect you with a tutor who will motivate, challenge, and inspire you.', 
      color: 'bg-purple-100' 
    },
    { 
      title: 'Find or Become a Tutor', 
      desc: 'Browse tutors or set up your teaching profile. We’ll connect you with a tutor who will motivate, challenge, and inspire you.', 
      color: 'bg-pink-100' 
    },
    { 
      title: 'Book Classes', 
      desc: 'Schedule sessions at your convenience. Choose how many lessons you want to teach each week and get ready to reach your goals!', 
      color: 'bg-yellow-100' 
    },
    { 
      title: 'Start Learning', 
      desc: 'Join live sessions & track your progress. Your tutor will guide the way through your first lesson and help you plan your next steps.', 
      color: 'bg-green-100' 
    },
  ];

  return (
    <section className="min-h-screen py-12 px-6 bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">HOW EDUNEXUM WORKS</h2>
      <p className="text-center text-gray-600 mb-10">
        Turn your expertise into income by teaching students worldwide. EduNexum empowers tutors with...
      </p>
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
        {steps.map((step, index) => (
          <div
          key={index}
          className={`w-full md:w-1/4 p-6 rounded-lg shadow-md text-center ${step.color} flex flex-col h-[300px]`}
        >
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm md:text-base">{step.desc}</p>
          </div>
          <img src={arrow} alt="Arrow" className=" scale-125 mt-4 mx-auto w-6 h-6" /> {/* Placeholder for arrow image */}
        </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;