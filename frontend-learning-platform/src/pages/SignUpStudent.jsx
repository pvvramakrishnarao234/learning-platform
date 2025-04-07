import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUpStudent = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', retypePassword: '', role: 'student',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState('');
  const [retypeError, setRetypeError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors when typing
    if (name === 'password') {
      setPasswordError('');
    }
    if (name === 'retypePassword') {
      setRetypeError('');
    }
  };

  // Prevent paste in password fields
  const handlePaste = (e) => {
    if (e.target.name === 'password' || e.target.name === 'retypePassword') {
      e.preventDefault();
      return false;
    }
  };

  // Calculate password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    // Length check
    if (formData.password.length >= 12) strength += 20;
    // Lowercase check
    if (/[a-z]/.test(formData.password)) strength += 20;
    // Uppercase check
    if (/[A-Z]/.test(formData.password)) strength += 20;
    // Number check
    if (/\d/.test(formData.password)) strength += 20;
    // Special character check
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 20;

    setPasswordStrength(strength);
  }, [formData.password]);

  const validatePassword = () => {
    if (formData.password.length < 12) {
      setPasswordError('Password must be at least 12 characters long');
      return false;
    }
    if (!/[a-z]/.test(formData.password)) {
      setPasswordError('Password must contain at least one lowercase letter');
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/\d/.test(formData.password)) {
      setPasswordError('Password must contain at least one number');
      return false;
    }
    if (!/[^A-Za-z0-9]/.test(formData.password)) {
      setPasswordError('Password must contain at least one special character');
      return false;
    }
    return true;
  };

  const validateRetypePassword = () => {
    if (formData.password !== formData.retypePassword) {
      setRetypeError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword() || !validateRetypePassword()) {
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        login({
          id: data.user.id,
          role: data.user.role,
          name: `${data.user.firstName} ${data.user.lastName}`
        }, data.token);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during sign up');
    }
  };

  // Get strength color based on percentage
  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Student Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            onPaste={handlePaste}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
          <div className="mt-1 h-1 w-full bg-gray-200 rounded-full">
            <div 
              className={`h-1 rounded-full ${getStrengthColor()}`} 
              style={{ width: `${passwordStrength}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Password must contain: 12+ characters, uppercase, lowercase, number, and special character
          </p>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>
        
        <div>
          <input 
            type="password" 
            name="retypePassword" 
            placeholder="Retype Password" 
            value={formData.retypePassword} 
            onChange={handleChange} 
            onPaste={handlePaste}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
          {retypeError && <p className="text-red-500 text-sm mt-1">{retypeError}</p>}
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Are you a teacher?{' '}
        <a href="/signup/teacher" className="text-blue-600 hover:underline">
          Sign up as Teacher
        </a>
      </p>
    </div>
  );
};

export default SignUpStudent;