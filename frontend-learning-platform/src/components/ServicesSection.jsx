const ServicesSection = () => {
    const services = [
      { title: 'Webinars', description: 'Attend live sessions with expert teachers.' },
      { title: 'Job Posts', description: 'Find or offer tutoring opportunities.' },
      { title: 'Teacher Discovery', description: 'Connect with top educators in your field.' },
    ];
  
    return (
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ServicesSection;