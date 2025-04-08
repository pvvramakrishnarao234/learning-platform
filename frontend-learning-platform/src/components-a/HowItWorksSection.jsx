import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    { title: 'Sign Up', desc: 'Create a free student or tutor account' },
    { title: 'Find or Be a Tutor', desc: 'Browse tutors or set up your profile' },
    { title: 'Schedule Lessons', desc: 'Choose sessions that suit you' },
    { title: 'Start Learning', desc: 'Join a tutor and start your first lesson' },
  ];

  return (
    <section className="py-12 px-6 bg-blue-50">
      <h2 className="text-3xl font-bold text-center mb-6">HOW EDUNEXUM WORKS</h2>
      <p className="text-center mb-8">Turn your expertise into income by teaching students worldwide. EduNexum empowers tutors with...</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md text-center">
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
