import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (storedToken) {
      try {
        fetch('/api/profiles', {
          headers: { 'Authorization': `Bearer ${storedToken}` },
        })
          .then(res => res.json())
          .then(data => {
            setUser({ id: data.user._id, role: data.user.role, name: `${data.user.firstName} ${data.user.lastName}` });
            setToken(storedToken);
          })
          .catch(() => {
            setUser(null);
            setToken(null);
          });
      } catch (error) {
        setUser(null);
        setToken(null);
      }
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    document.cookie = `token=${authToken}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);