import React from 'react';

const MissionSection = () => {
  return (
    <section className="bg-blue-50 py-12 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">OUR MISSION</h2>
      <p className="text-lg max-w-2xl mx-auto">
        To revolutionize the way students learn by providing cutting-edge technology, expert tutors, and a user-friendly platform that fosters
        knowledge and skill development.
      </p>
      <img src="/mission-image.jpg" alt="Mission" className="mt-6 mx-auto w-1/3" />
    </section>
  );
};

export default MissionSection;