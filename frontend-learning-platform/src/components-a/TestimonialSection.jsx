import React from 'react';

const TestimonialSection = () => {
  return (
    <section className="py-12 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">WHAT OUR USERS SAY</h2>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <p className="text-lg mb-4 md:mr-4">
          "EduNexum completely changed the way I found tutors. The interactive sessions kept me engaged, and I saw progress in just a few weeks. That’s amazing!"
          <br />- Sophia L, Learning Tutor
        </p>
        <img src="/testimonial-image.jpg" alt="Testimonial" className="w-1/4 rounded-full" />
      </div>
    </section>
  );
};

export default TestimonialSection;