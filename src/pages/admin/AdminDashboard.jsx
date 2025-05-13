import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Users, Package, ShoppingCart, CalendarClock } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Check if the token is available in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("Authorization token is missing");
          return;
        }

        
        const res = await axios.get("/api/admins/dashboard-stats", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (res.data) {
          setStats(res.data);
        } else {
          toast.error("No stats available");
        }
      } catch (error) {
        console.error("Failed to fetch stats", error.response || error);
        toast.error("Error fetching dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        No data available
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <DashboardCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="w-8 h-8 text-blue-200" />}
          bgColor="bg-blue-500"
        />
        <DashboardCard
          title="Total Admins"
          value={stats.totalAdmins}
          icon={<Users className="w-8 h-8 text-red-200" />}
          bgColor="bg-red-500"
        />
        <DashboardCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package className="w-8 h-8 text-purple-200" />}
          bgColor="bg-purple-600"
        />
        <DashboardCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart className="w-8 h-8 text-green-200" />}
          bgColor="bg-green-600"
        />
        <DashboardCard
          title="Total Schedules"
          value={stats.totalSchedules}
          icon={<CalendarClock className="w-8 h-8 text-orange-200" />}
          bgColor="bg-orange-500"
        />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, bgColor }) => (
  <div
    className={`rounded-2xl p-6 text-white shadow-lg transition-transform transform hover:scale-105 ${bgColor}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-md mb-1 opacity-80">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

export default AdminDashboard;
