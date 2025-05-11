import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';

const Login = () => {
  const [email, setEmail] = useState(""); // Or username if your backend uses that
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { fetchCart } = useCart();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      }, { withCredentials: true,
        timeout: 5000
       });
       console.log('Login API Response:', response.data);
       const { user, token } = response.data;

      login(user, token);
      toast.success('Login successful');
      await fetchCart(); 
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
      }catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Login failed:", error.response.data);
          toast.error(error.response.data.message || "Login failed. Please try again.");
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received:", error.request);
          toast.error("No response from server. Please check your network connection.");
        } else {
          // Something else happened
          console.error("Error:", error.message);
          toast.error("An unexpected error occurred. Please try again.");
        }
      };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white border rounded-md p-8 w-full max-w-sm shadow-md">
        {/* You can add your Logo here if you want */}
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-200 rounded focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-200 rounded focus:outline-none"
            required
          />

          <button
            onClick={handleLogin}
            className="w-full py-2 bg-gray-800 text-white font-semibold rounded hover:bg-black"
          >
            Login
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
