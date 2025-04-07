import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const countryCodes = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
].sort((a, b) => a.name.localeCompare(b.name));

const SignUpTeacher = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', retypePassword: '',
    bio: '', services: [{ name: '',  pricePerHour: '' }],
    location: '', timings: '', languagesSpoken: '', tags: '', 
    contactNumber: '', countryCode: '+91', role: 'teacher',
    socialMedia: { linkedIn: '', twitter: '' }
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState('');
  const [retypeError, setRetypeError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const filteredCountries = useMemo(() => {
    return countryCodes.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.includes(searchTerm)
    );
  }, [searchTerm]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') setPasswordError('');
    if (name === 'retypePassword') setRetypeError('');
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }));
  };

  const handleServiceChange = (index, field, value) => {
    setFormData(prev => {
      const newServices = [...prev.services];
      newServices[index][field] = value;
      return { ...prev, services: newServices };
    });
  };

  const addService = () => {
    if (formData.services.length < 3) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, { name: '', description: '', pricePerHour: '' }]
      }));
    }
  };

  const removeService = (index) => {
    if (formData.services.length > 1) {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter((_, i) => i !== index)
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,15}$/.test(value)) {
      setFormData(prev => ({ ...prev, contactNumber: value }));
    }
  };

  const selectCountry = (code) => {
    setFormData(prev => ({ ...prev, countryCode: code }));
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  // Effects
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (formData.password.length >= 12) strength += 20;
    if (/[a-z]/.test(formData.password)) strength += 20;
    if (/[A-Z]/.test(formData.password)) strength += 20;
    if (/\d/.test(formData.password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 20;

    setPasswordStrength(strength);
  }, [formData.password]);

  // Validations
  const validatePassword = () => {
    const { password } = formData;
    if (password.length < 12) {
      setPasswordError('Password must be at least 12 characters long');
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError('Must contain at least one lowercase letter');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Must contain at least one uppercase letter');
      return false;
    }
    if (!/\d/.test(password)) {
      setPasswordError('Must contain at least one number');
      return false;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setPasswordError('Must contain at least one special character');
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
    
    if (!validatePassword() || !validateRetypePassword()) return;

    const formattedData = {
      ...formData,
      languagesSpoken: formData.languagesSpoken.split(',').map(lang => lang.trim()),
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
      
      const data = await res.json();
      if (res.ok) {
        login({ 
          id: data.userId, 
          role: 'teacher', 
          name: `${formData.firstName} ${formData.lastName}` 
        }, data.token);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  // Helper functions
  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Teacher Sign Up</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Info */}
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        
        {/* Password Fields */}
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
          <div className="mt-1 h-1 w-full bg-gray-200 rounded-full">
            <div 
              className={`h-1 rounded-full ${getStrengthColor()}`} 
              style={{ width: `${passwordStrength}%` }}
            />
          </div>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>
        
        <input 
          type="password" 
          name="retypePassword" 
          placeholder="Retype Password" 
          value={formData.retypePassword} 
          onChange={handleChange} 
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required 
        />
        {retypeError && <p className="text-red-500 text-sm mt-1">{retypeError}</p>}

        {/* Bio */}
        <textarea 
          name="bio" 
          placeholder="Bio (Tell us about yourself)" 
          value={formData.bio} 
          onChange={handleChange} 
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          rows={4}
        />

        {/* Services Section */}
        <div className="space-y-6 border p-6 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Services</h2>

          {formData.services.map((service, index) => (
            <div key={index} className="space-y-4 border p-5 rounded-md bg-gray-50 relative">
              <input
                type="text"
                placeholder="Service Name"
                value={service.name}
                onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Service Description"
                value={service.description}
                onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Price per Hour"
                value={service.pricePerHour}
                onChange={(e) => handleServiceChange(index, 'pricePerHour', e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Delete Button - centered at bottom */}
              {formData.services.length > 1 && (
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add Service Button - styled properly */}
          {formData.services.length < 3 && (
            <div className="pt-2">
              <button
                type="button"
                onClick={addService}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                + Add Service
              </button>
            </div>
          )}
        </div>

        
        {/* Other Fields */}
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="timings" placeholder="Timings (e.g., 9 AM - 5 PM)" value={formData.timings} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="languagesSpoken" placeholder="Languages Spoken (comma-separated)" value={formData.languagesSpoken} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <div className="flex gap-2">
            <div className="relative w-1/4">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-3 border rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{formData.countryCode}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
                  <div className="px-2 py-1 sticky top-0 bg-white">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 border-b focus:outline-none"
                      autoFocus
                    />
                  </div>
                  
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => selectCountry(country.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center ${formData.countryCode === country.code ? 'bg-blue-100' : ''}`}
                    >
                      <span className="mr-2">{country.flag}</span>
                      <span className="font-medium">{country.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <input
              type="tel"
              name="contactNumber"
              placeholder="Phone number" 
              value={formData.contactNumber}
              onChange={handlePhoneChange}
              className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Social Media</label>
          <input
            type="url"
            placeholder="LinkedIn Profile URL"
            value={formData.socialMedia.linkedIn}
            onChange={(e) => handleSocialMediaChange('linkedIn', e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            placeholder="Twitter Profile URL"
            value={formData.socialMedia.twitter}
            onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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