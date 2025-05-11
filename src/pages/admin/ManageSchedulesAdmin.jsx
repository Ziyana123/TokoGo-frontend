import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const ManageSchedulesAdmin = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllSchedules = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/schedule/admins/all", { withCredentials: true });
      setSchedules(res.data);
    } catch (error) {
      console.error("Error fetching schedules", error);
      toast.error(error.response?.data?.message || "Failed to load schedules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSchedules();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosInstance.put(`/schedule/admins/${id}/status`, { status }, { withCredentials: true });
      toast.success("Status updated.");
      fetchAllSchedules();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status.");
    }
  };

  const cancelSchedule = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this schedule?")) return;

    try {
      await axiosInstance.put(`/schedule/admins/cancel/${id}`, {}, { withCredentials: true });
      toast.success("Schedule canceled.");
      fetchAllSchedules();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error canceling schedule.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this schedule?")) return;

    try {
      await axiosInstance.delete(`/schedule/admins/${id}`, { withCredentials: true });
      toast.success("Schedule deleted.");
      fetchAllSchedules();
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      toast.error("Failed to delete schedule.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Scheduled Deliveries</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : schedules.length === 0 ? (
        <p className="text-center text-gray-500">No schedules found.</p>
      ) : (
        <div className="space-y-6">
          {schedules.map((schedule) => (
            <div
              key={schedule._id}
              className="border rounded-lg p-5 shadow bg-white space-y-2"
            >
              <p><strong>User:</strong> {schedule.userId?.name} ({schedule.userId?.email})</p>
              <p><strong>Date:</strong> {new Date(schedule.scheduledDate).toLocaleString()}</p>
              <p><strong>Address:</strong> {schedule.deliveryAddress}</p>
              <p>
                <strong>Status:</strong>
                <select
                  value={schedule.status}
                  onChange={(e) => handleStatusChange(schedule._id, e.target.value)}
                  className={`ml-2 border rounded px-2 py-1 ${
                    schedule.status === "Completed"
                      ? "bg-green-100"
                      : schedule.status === "Cancelled"
                      ? "bg-red-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </p>

              <div>
                <p><strong>Items:</strong></p>
                <ul className="list-disc list-inside pl-4">
                  {schedule.items.map((item, i) => (
                    <li key={i}>
                      {item.productId?.name || "Product"} – Qty: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => cancelSchedule(schedule._id)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(schedule._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSchedulesAdmin;
