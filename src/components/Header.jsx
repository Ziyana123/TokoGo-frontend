import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import logo from '../assets/tokologo.png';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout, guestView } = useAuth();
  const { cartCount, clearCartLocally } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    clearCartLocally();
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="TokoGo Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition duration-300">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition duration-300">About</Link>
            <Link to="/contact" className="hover:text-blue-600 transition duration-300">Contact</Link>

            {!user && !guestView && (
              <Link to="/login" className="hover:text-blue-600 transition duration-300">Login</Link>
            )}

            {(user || guestView) && (
              <Link to="/cart" className="relative hover:text-blue-600 transition duration-300">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {user && !guestView && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(prev => !prev)}
                  className="hover:text-blue-600 focus:outline-none"
                >
                  <User className="w-6 h-6" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden transition ease-out duration-200 transform opacity-100 scale-100">
                    <Link to="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                    <Link to="/my-packs" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">My Packs</Link>
                    <Link to="/my-orders" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">My Orders</Link>
                    <Link to="/my-schedules" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">My Schedules</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white text-gray-700 font-medium space-y-2">
          <Link to="/" className="block hover:text-blue-600 transition duration-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block hover:text-blue-600 transition duration-300" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block hover:text-blue-600 transition duration-300" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          {!user && !guestView && (
            <Link to="/login" className="block hover:text-blue-600 transition duration-300" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}
          {(user || guestView) && (
            <Link to="/cart" className="block hover:text-blue-600 transition duration-300" onClick={() => setIsMenuOpen(false)}>Cart ({cartCount})</Link>
          )}
          {user && !guestView && (
            <>
              <Link to="/profile" className="block hover:text-blue-600 transition duration-300" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              <Link to="/my-packs" className="block hover:text-blue-600 transition duration-300" onClick={() => setIsMenuOpen(false)}>My Packs</Link>
              <Link to="/my-orders" className="block hover:text-blue-600 transition duration-300" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              <Link to="/my-schedules" className="block hover:text-blue-600 transition duration-300" onClick={() => setIsMenuOpen(false)}>My Schedules</Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-left w-full text-red-600 hover:text-red-800">Logout</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
