import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUpTeacher = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', retypePassword: '',
    bio: '', description: '', services: [{ name: '', description: '', pricePerHour: '' }],
    location: '', timings: '', languagesSpoken: '', tags: '', contactNumber: '', role: 'teacher',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...formData.services];
    newServices[index][field] = value;
    setFormData({ ...formData, services: newServices });
  };

  const addService = () => {
    if (formData.services.length < 3) {
      setFormData({ ...formData, services: [...formData.services, { name: '', description: '', pricePerHour: '' }] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      languagesSpoken: formData.languagesSpoken.split(',').map(lang => lang.trim()),
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
      const data = await res.json();
      if (res.ok) {
        login({ id: data.userId, role: 'teacher', name: `${formData.firstName} ${formData.lastName}` }, data.token);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Teacher Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="password" name="retypePassword" placeholder="Retype Password" value={formData.retypePassword} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        
        {formData.services.map((service, index) => (
          <div key={index} className="space-y-2 border p-4 rounded-md">
            <input type="text" placeholder="Service Name" value={service.name} onChange={(e) => handleServiceChange(index, 'name', e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" placeholder="Service Description" value={service.description} onChange={(e) => handleServiceChange(index, 'description', e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="number" placeholder="Price per Hour" value={service.pricePerHour} onChange={(e) => handleServiceChange(index, 'pricePerHour', e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
        ))}
        {formData.services.length < 3 && (
          <button type="button" onClick={addService} className="text-blue-600 hover:underline">Add Another Service</button>
        )}
        
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="timings" placeholder="Timings (e.g., 9 AM - 5 PM)" value={formData.timings} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="languagesSpoken" placeholder="Languages Spoken (comma-separated)" value={formData.languagesSpoken} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="tags" placeholder="Tags (comma-separated, max 25)" value={formData.tags} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Are you a student?{' '}
        <a href="/signup/student" className="text-blue-600 hover:underline">
          Sign up as Student
        </a>
      </p>
    </div>
  );
};

export default SignUpTeacher;