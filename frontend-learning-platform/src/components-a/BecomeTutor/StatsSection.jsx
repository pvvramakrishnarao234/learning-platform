import React from 'react';

const StatItem = ({ number, label }) => (
  <div className="flex flex-col items-center">
    <p className="text-2xl md:text-3xl font-bold">{number}</p>
    <p className="text-sm md:text-base font-medium">{label}</p>
  </div>
);

const StatsSection = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-gray-700 mb-6">Our Student & Parents love us</h3>
        
        <div className="flex flex-wrap justify-around items-center">
          <StatItem number="100+" label="Teachers" />
          <StatItem number="4.5+" label="Ratings" />
          <StatItem number="100+" label="Cities" />
          <StatItem number="100+" label="Students" />
        </div>
      </div>
    </div>
  );
};

export default StatsSection;