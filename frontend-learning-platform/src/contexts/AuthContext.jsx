import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for token in cookies on mount
  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      // Decode token or fetch user data (simplified here)
      // For now, we'll assume token contains role and id
      try {
        fetch('/api/profiles', {
          headers: { 'Authorization': `Bearer ${token}` },
        })
          .then(res => res.json())
          .then(data => setUser({ id: data.user._id, role: data.user.role, name: `${data.user.firstName} ${data.user.lastName}` }))
          .catch(() => setUser(null));
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
  };

  const logout = () => {
    setUser(null);
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Clear cookie
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);