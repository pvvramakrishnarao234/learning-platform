import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student', rememberMe: false });
  const [error, setError] = useState(''); // New state for error handling
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const res = await fetch(formData.role === 'admin' ? '/api/auth/admin/signin' : '/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Ensure required fields are present in the response
        if (!data.user?.id || !data.user?.role || !data.token) {
          throw new Error('Invalid response from server');
        }
        login({
          id: data.user.id,
          role: data.user.role,
          name: data.user.firstName && data.user.lastName
            ? `${data.user.firstName} ${data.user.lastName}`
            : 'User', // Fallback if name fields are missing
        }, data.token);
        navigate('/');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Signin error:', error);
      setError('An error occurred during sign in. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
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
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
          Don't have an account?{' '}
          <Link to="/signup-student" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;