import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student', rememberMe: false });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(formData.role === 'admin' ? '/api/auth/admin/signin' : '/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        login({ id: data.userId, role: formData.role, name: 'User' }, data.token); // Replace 'User' with actual name from backend
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Signin error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4 justify-center">
          <label className="flex items-center">
            <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={handleChange} className="mr-2" />
            Student
          </label>
          <label className="flex items-center">
            <input type="radio" name="role" value="teacher" checked={formData.role === 'teacher'} onChange={handleChange} className="mr-2" />
            Teacher
          </label>
          <label className="flex items-center">
            <input type="radio" name="role" value="admin" checked={formData.role === 'admin'} onChange={handleChange} className="mr-2" />
            Admin
          </label>
        </div>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <label className="flex items-center">
          <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="mr-2" />
          Remember Me
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300">
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center">
        <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
      </p>
      <p className="mt-2 text-center">
        Don’t have an account?{' '}
        <a href="/signup/student" className="text-blue-600 hover:underline">Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;