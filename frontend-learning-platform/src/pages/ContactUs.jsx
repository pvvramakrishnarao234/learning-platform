import ContactForm from '../components/ContactForm';

const ContactUs = () => {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h1>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;