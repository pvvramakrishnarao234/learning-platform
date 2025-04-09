import React from 'react';
import testimonial from '../../assets/Homepage/Testimonial.png'; // Assuming you have a testimonial image in your assets folder
import testimonialbg from '../../assets/Homepage/Testimonial BG.png'; // Assuming you have a background image in your assets folder
const TestimonialSection = () => {
  return (
    <section className="py-12 px-6 ">
      <div className=''>
        <span className="text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full text-sm">
              Testimonials
            </span>
        <h2 className="text-3xl font-bold mb-6 ">WHAT OUR USERS SAY</h2>
        <p>Hear from Our Students & Tutors</p>
      </div>
      <div
        className="max-w-7xl  w-full flex flex-col md:flex-row justify-center items-center bg-cover bg-center py-12 px-6 gap-10  pl-20"
        style={{ backgroundImage: `url(${testimonialbg})` }}
      >
        <div className="text-center md:text-left space-y-4 w-full md:w-1/2">
        <h1 className='text-3xl'>Sophia L,<br/>
        <span className='text-orange-500'>Learning Tutor</span> </h1>
        <p className=" text-center md:text-left space-y-4 w-full md:w-1/2">
          "EduNexum completely changed the way I found tutors. The interactive sessions kept me engaged, and I saw progress in just a few weeks. That’s amazing!"
          
        </p>
        </div>
        <div className="w-full h-auto md:w-1/2 flex justify-center object-cover mr-13">
        <img src={testimonial} alt="Testimonial" className="w-auto h-full max-h-96 object-cover scale-133" />
        </div>
      </div>
    </section>
  );
};
export default TestimonialSection;