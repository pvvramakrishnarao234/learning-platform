const axios = require('axios');
const baseURL = 'http://localhost:5000/api';

// Test user credentials
const testUser = {
  email: 'test@example.com',
  password: 'password123',
  firstName: 'Test',
  lastName: 'User',
  role: 'student'
};

let authToken = '';

// Test registration
async function testRegistration() {
  try {
    const response = await axios.post(`${baseURL}/auth/register`, testUser);
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
  }
}

// Test login
async function testLogin() {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    authToken = response.data.token;
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
  }
}

// Test profile creation
async function testProfileCreation() {
  try {
    const response = await axios.post(`${baseURL}/profiles`, {
      bio: 'Test bio',
      services: ['Test Service']
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('Profile creation successful:', response.data);
  } catch (error) {
    console.error('Profile creation failed:', error.response?.data || error.message);
  }
}

// Test profile retrieval
async function testProfileRetrieval() {
  try {
    const response = await axios.get(`${baseURL}/profiles`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('Profile retrieval successful:', response.data);
  } catch (error) {
    console.error('Profile retrieval failed:', error.response?.data || error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('Starting API tests...');
  await testRegistration();
  await testLogin();
  await testProfileCreation();
  await testProfileRetrieval();
  console.log('API tests completed.');
}

runTests(); 