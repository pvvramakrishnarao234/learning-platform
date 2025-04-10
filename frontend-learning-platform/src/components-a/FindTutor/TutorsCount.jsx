// components/findTutor/TutorsCount.jsx
import React from 'react';

const TutorsCount = ({ count }) => {
  return (
    <div className="my-6">
      <h2 className="text-lg font-bold text-gray-800">
        {count.toLocaleString()} English tutors to boost your speaking skills
      </h2>
    </div>
  );
};

export default TutorsCount;