import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/admins/register",
        {
          name: username,
          email,
          password,
          role: "admin", 
        },
        { withCredentials: true }
      );

      toast.success("Admin registered successfully");
      setEmail("");
      setUsername("");
      setPassword("");
      navigate('/login');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register Admin</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-200 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-200 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-200 rounded"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white font-semibold rounded hover:bg-black"
          >
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
