import React from 'react';

const CallToAction = () => {
  return (
    <section className="bg-blue-900 text-white py-12 px-6 text-center">
      <h2 className="text-3xl  mb-4">Join <span className='text-orange-500 font-bold'>Edunexum</span> today and take the first step towards <span className='text-orange-500 font-bold'>success</span>!</h2>
      <div className="flex justify-center space-x-4">
        <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Find a Tutor</button>
        <button className="bg-white text-blue-900 px-6 py-2 rounded hover:bg-gray-200">Become a Tutor</button>
      </div>
    </section>
  );
};

export default CallToAction;