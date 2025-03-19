// frontend/src/App.jsx
import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/users/test')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-6xl font-bold text-blue-600">
        {message || 'Welcome to the Learning Platform'}
      </h1>
    </div>
  );
}

export default App;