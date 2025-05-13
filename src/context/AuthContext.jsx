import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

let currentToken = null; // Used for external access via getToken()

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
      currentToken = storedToken;
    }
    setLoading(false);
  }, []);

  const login = (userData, newToken) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', newToken);
    currentToken = newToken;
    setGuestView(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    currentToken = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('allTravelPacks');
    localStorage.removeItem('recommendations');
    setGuestView(false);
  };

  const toggleGuestView = () => {
    setGuestView((prev) => !prev);
  };

  const enableGuestView = () => setGuestView(true);
  const disableGuestView = () => setGuestView(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAdmin,
        guestView,
        toggleGuestView,
        setGuestView,
        enableGuestView,
        disableGuestView,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// ✅ Export this for axios or other non-React files
export const getToken = () => currentToken || localStorage.getItem('token');
