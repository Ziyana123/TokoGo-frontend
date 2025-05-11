import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  const [guestView, setGuestView] = useState(false);
  const isAdmin = user?.role === 'admin';
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false); 
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setGuestView(false);
  };

const logout = () => {
  setUser(null);
  setToken(null);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('allTravelPacks'); 
  localStorage.removeItem('recommendations'); 
  setGuestView(false);
};

  const toggleGuestView = () => {
    setGuestView((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAdmin, guestView, toggleGuestView ,setGuestView }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
