const MetricsSection = () => {
    const metrics = [
      { value: '100+', label: 'Teachers' },
      { value: '500+', label: 'Webinars Hosted' },
      { value: '1000+', label: 'Students' },
    ];
  
    return (
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {metrics.map((metric, index) => (
            <div key={index}>
              <h3 className="text-4xl font-bold">{metric.value}</h3>
              <p className="text-lg">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default MetricsSection;