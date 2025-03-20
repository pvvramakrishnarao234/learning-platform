const AboutUs = () => {
const team = [
    { name: 'Alice Johnson', role: 'Founder', photo: 'https://via.placeholder.com/150' },
    { name: 'Bob Lee', role: 'Lead Developer', photo: 'https://via.placeholder.com/150' },
];

return (
    <div className="py-16 max-w-7xl mx-auto px-4">
    <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">About Us</h1>
    
    <section className="mb-16">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Story</h2>
        <p className="text-gray-600">
        LearnSphere was founded to bridge the gap between students and educators, creating a seamless platform for learning and growth.
        </p>
    </section>
    
    <section className="mb-16">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Strengths</h2>
        <ul className="list-disc list-inside text-gray-600">
        <li>Expert-led webinars</li>
        <li>Personalized teacher matching</li>
        <li>Community-driven learning</li>
        </ul>
    </section>
    
    <section className="mb-16">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
        <p className="text-gray-600">
        To empower every learner and educator with the tools they need to succeed.
        </p>
    </section>
    
    <section className="mb-16">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Vision</h2>
        <p className="text-gray-600">
        A world where education is accessible, engaging, and tailored to every individual.
        </p>
    </section>
    
    <section>
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {team.map((member, index) => (
            <div key={index} className="text-center">
            <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
            </div>
        ))}
        </div>
    </section>
    </div>
);
};

export default AboutUs;