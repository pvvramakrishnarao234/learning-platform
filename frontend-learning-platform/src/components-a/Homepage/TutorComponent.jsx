import React from 'react';
import section3 from '../../assets/Homepage/section3.png'; // Adjust the path as necessary
const TutorComponent = () => {
  return (
    <div className="min-h-screen bg-blue-50  flex items-center justify-center ">
      <div className="max-w-7xl  w-full flex flex-col md:flex-row items-center justify-between gap-10  pl-20">
        {/* Left Section - Text Content */}
        <div className="text-center md:text-left space-y-4 w-full md:w-1/2">
          <span className="text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full text-sm">
            Tutor
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            BECOME A TUTOR & EARN WITH YOUR KNOWLEDGE
          </h1>
          <p className="text-gray-600 text-base">
            Turn your expertise into income by teaching students worldwide. Edunex empowers tutors with:
          </p>
          <ul className="text-gray-600 space-y-2 list-none pl-5">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Flexible Teaching: Set your own schedule & rates
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Global Reach: Teach students from anywhere
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Secure Payments: Guaranteed payouts, no hidden fees
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Smart Dashboard: Manage classes, track progress, and interact with students
            </li>
          </ul>
          <p className="text-gray-500 italic mt-4 text-sm">
            <a href="#" className="underline text-blue-600 hover:text-blue-800">
              Join as a Tutor & Start Teaching Today!
            </a>
          </p>
          <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300">
            Become a Tutor
          </button>
        </div>

        {/* Right Section - Placeholder for Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={section3}// Replace with your image path or URL
            alt="Tutor"
            className="w-auto h-auto max-h-96 object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default TutorComponent;