import React from 'react';

const Stats = () => {
  return (
    <div className="bg-blue-600 py-6">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-full p-4 shadow-lg flex justify-center items-center divide-x divide-gray-200">
          <div className="px-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600">30K</h3>
            <p className="text-xs text-gray-500">STUDENTS ENROLLED</p>
          </div>
          <div className="px-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600">40K</h3>
            <p className="text-xs text-gray-500">CLASSES COMPLETED</p>
          </div>
          <div className="px-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600">98%</h3>
            <p className="text-xs text-gray-500">SATISFACTION RATE</p>
          </div>
          <div className="px-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600">8.3+</h3>
            <p className="text-xs text-gray-500">TOP INSTRUCTORS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

