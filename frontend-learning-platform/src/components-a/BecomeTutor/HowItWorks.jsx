// components/HowItWorks.jsx
import React from 'react';

const FeatureCard = ({ title, description, icon, className }) => {
  return (
    <div className={`bg-opacity-20 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 ${className}`}>
      <div className="mb-4">
        <img src={icon} alt={title} className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">HOW EDUNEXUM WORKS</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Turn your expertise into income by teaching students worldwide. 
          EduNexum empowers tutors with:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="./src/assets/BecomeTutor/grow.png"
            title="Set your own rate"
            description="Choose your hourly rate and charge it consistently. On average, English tutors charge 25-29 per hour."
            className="bg-purple-100"
          />
          
          <FeatureCard 
            icon="./src/assets/BecomeTutor/grow.png"
            title="Teach anytime, anywhere"
            description="Decide when and how many hours you want to teach. No minimum time commitment or fixed schedule. Be your own boss!"
            className="bg-orange-100"
          />
          
          <FeatureCard 
            icon="./src/assets/BecomeTutor/grow.png"
            title="Grow professionally"
            description="Attend professional development workshops on different topics to grow your skills. You'll get all the help you need from our team to grow."
            className="bg-yellow-100"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;