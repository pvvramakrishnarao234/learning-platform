import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    { name: 'John Doe', imageSrc: '/team1.jpg' },
    { name: 'Jane Smith', imageSrc: '/team2.jpg' },
    { name: 'Alice Johnson', imageSrc: '/team3.jpg' },
    { name: 'Bob Wilson', imageSrc: '/team4.jpg' },
  ];

  return (
    <section className="py-12 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">JOIN OUR TEAM</h2>
      <p className="text-lg mb-6">We love what we do and do it with passion</p>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        {teamMembers.map((member, index) => (
          <img key={index} src={member.imageSrc} alt={member.name} className="w-16 h-16 rounded-full" />
        ))}
      </div>
      <button className="bg-blue-500 text-white px-6 py-2 mt-4 rounded hover:bg-blue-600">See Current Openings</button>
    </section>
  );
};

export default TeamSection;