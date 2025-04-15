import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = async (tokenToCheck) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/check', {
        headers: { 
          'Authorization': `Bearer ${tokenToCheck || token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data.user);
      setError(null);
    } catch (error) {
      console.error('Auth check failed:', error);
      setError(error.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // console.log(data);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setError(null);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginByToken = async ({user, token}) => {
    try {
      // console.log(user, token);
      setLoading(true);
      setUser(user);
      setToken(token);
      // console.log("AuthContext: ",user, token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setError(null);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optional: Call backend logout endpoint if needed
    fetch('/api/auth/logout', { credentials: 'include' });
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      // if (savedToken && savedUser) {
      //   setToken(savedToken);
      //   setUser(JSON.parse(savedUser));
      //   // console.log(user, token);
      //   // console.log(savedToken, savedUser);

      //   await checkAuth(savedToken);
      // } else {
      //   setLoading(false);
      // }

      if (savedToken && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
  
          setToken(savedToken);
          setUser(parsedUser);
          setError(null);
        } catch (err) {
          console.error('Failed to parse user from localStorage:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken(null);
        }
      }
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      loginByToken,
      logout, 
      loading,
      error,
      isAuthenticated: !!user && !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);