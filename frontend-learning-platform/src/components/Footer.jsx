const Footer = () => {
return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
    <div className="max-w-7xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} LearnSphere. All rights reserved.</p>
        <div className="mt-2 space-x-4">
        <a href="#" className="hover:text-blue-400">Privacy Policy</a>
        <a href="#" className="hover:text-blue-400">Terms of Service</a>
        <a href="#" className="hover:text-blue-400">Contact Us</a>
        </div>
    </div>
    </footer>
);
};

export default Footer;